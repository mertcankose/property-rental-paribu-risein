// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

library Str {
    function strlen(string memory _note) external pure returns (uint256) {
        uint256 len;
        uint256 i = 0;
        uint256 byteLength = bytes(_note).length;

        for (len = 0; i < byteLength; len++) {
            bytes1 b = bytes(_note)[i];
            if (b < 0x80) {
                i += 1;
            } else if (b < 0xE0) {
                i += 2;
            } else if (b < 0xF0) {
                i += 3;
            } else if (b < 0xF8) {
                i += 4;
            } else if (b < 0xFC) {
                i += 5;
            } else {
                i += 6;
            }
        }
        return len;
    }
}

contract PropertyRental is Ownable, ReentrancyGuard, Pausable {
    // property type enum
    enum PropertyType {
        house,
        shop,
        land,
        car
    }

    enum UserType {
        holder,
        tenant
    }

    // mülk struct
    struct Property {
        bytes32 id;
        string name;
        uint256 price;
        address holderAddress;
        address tenantAddress;
        PropertyType propertyType;
        bool isInAd;
        bool isRented;
        bool isRequestToEnd;
        uint256 createdAt;
        uint256 putAdAt;
    }

    // user struct
    struct User {
        address userAddress;
        string description;
        bool isPenalized;
        UserType userType;
    }

    // şikayet struct
    struct Complaint {
        bytes32 id;
        address complainantAddress;
        address reportedAddress;
        string reason;
        Property property;
        bool isControlled;
        bool isValid;
    }

    // sözleşme struct
    struct RentalContract {
        bytes32 id;
        address holderAddress;
        address hirerAddress;
        Property property;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        bool isEarlyEndRequest;
    }

    // user
    User[] public users;
    mapping(address => User) public usersMap; // users map

    // property
    Property[] public properties;
    mapping(bytes32 => Property) public propertiesMap; // mülkü id'sine göre getirmemizi sağlayan mapping

    // holder properties
    mapping(address => Property[]) public holderPropertiesMap; // bir adresin(holderın) sahip olduğu mülkleri getiren mapping
    mapping(address => Property[]) public tenantPropertiesMap; // bir adresin(kiracının) kiraladığı mülkleri getiren mapping

    // properties in the advert
    Property[] public propertiesInTheAd;
    mapping(bytes32 => Property) public propertyAdMap;
    mapping(address => Property[]) public holderPropertiesInTheAd;

    // tenant requests
    mapping(bytes32 => User) public tenantRequests;

    // contracts
    RentalContract[] public rentalContracts;
    mapping(bytes32 => RentalContract) public rentalContractsMap;

    // complaints
    /*
    Complaint[] public complaints;
    mapping(bytes32 => Complaint) public complaintsMap;
    */

    // events
    // mülk kaydetme eventi
    event PropertySaved(
        address indexed _address,
        string _name,
        uint256 _price,
        PropertyType _propertyType,
        uint256 _createdAt
    );

    // mülkü ilana koyma eventi
    event PropertyPutdAd(
        address indexed _address,
        bytes32 _id,
        uint256 _createdAt
    );

    // sisteme kayıt ol
    function registerSystem(
        string memory _description,
        UserType _userType
    ) external nonReentrant returns (bool) {
        User memory user = User({
            userAddress: address(msg.sender),
            description: _description,
            isPenalized: false,
            userType: _userType
        });

        users.push(user);
        usersMap[msg.sender] = user;

        return true;
    }

    function isUserAddressEmpty(
        address _userAddress
    ) external view returns (bool) {
        User memory user = usersMap[_userAddress];
        return (user.userAddress == address(0));
    }

    function getUser(address _userAddress) external view returns (User memory) {
        User memory user = usersMap[_userAddress];
        return user;
    }

    // mülk sahibinin mülklerini getir
    function getHolderProperties(
        address _holderUserAddress
    ) external view returns (Property[] memory) {
        return holderPropertiesMap[_holderUserAddress];
    }

    // mülk sahibinin ilana koyduklarını getir
    function getHolderPropertiesInTheAd(
        address _holderUserAddress
    ) external view returns (Property[] memory) {
        return holderPropertiesInTheAd[_holderUserAddress];
    }

    // kiracının kiraladığı mülkleri getir
    function getTenantProperties(
        address _tenantUserAddress
    ) external view returns (Property[] memory) {
        return tenantPropertiesMap[_tenantUserAddress];
    }

    // ilandaki mülkleri getir
    function getAllPropertiesInTheAd()
        external
        view
        returns (Property[] memory)
    {
        return propertiesInTheAd;
    }

    // mülk oluştur
    function createProperty(
        string memory _name,
        uint256 _price,
        PropertyType _propertyType,
        bool _isInAd,
        uint256 _createdAt
    ) external nonReentrant whenNotPaused returns (bool) {
        // sisteme register olmuş olması şart ve rolü holder olmalı bunları require ile kontrol et
        bytes32 _id = keccak256(
            abi.encode(_name, address(msg.sender), _createdAt)
        );

        Property memory property = Property({
            id: _id,
            name: _name,
            price: _price,
            holderAddress: address(msg.sender),
            tenantAddress: address(0),
            propertyType: _propertyType,
            isInAd: _isInAd,
            isRented: false,
            isRequestToEnd: false,
            createdAt: _createdAt,
            putAdAt: _createdAt
        });

        if (_isInAd) {
            propertiesInTheAd.push(property);
        }

        properties.push(property);
        propertiesMap[_id] = property;
        holderPropertiesMap[msg.sender].push(property);

        emit PropertySaved(
            msg.sender,
            _name,
            _price,
            _propertyType,
            _createdAt
        );

        return true;
    }

    // mülkü ilana koy
    function putPropertyInTheAd(
        bytes32 _propertyId,
        uint256 _createdAt
    ) external nonReentrant returns (bool) {
        Property storage _currentProperty = propertiesMap[_propertyId];
        require(
            _currentProperty.holderAddress == address(msg.sender),
            "Only owner!"
        );
        _currentProperty.isInAd = true;
        _currentProperty.putAdAt = _createdAt;
        propertiesInTheAd.push(_currentProperty);
        propertyAdMap[_propertyId] = _currentProperty;
        holderPropertiesInTheAd[msg.sender].push(_currentProperty);

        emit PropertyPutdAd(msg.sender, _propertyId, _createdAt);

        return true;
    }

    // mülke kiracı olma talebinde bulun (sadece kiracılar, mülk sahibi bulunamaz)
    function requestToBecomeTenant(
        bytes32 _propertyId
    ) external nonReentrant returns (bool) {
        Property memory _currentProperty = propertiesMap[_propertyId];
        User memory _currentUser = usersMap[msg.sender];
        require(
            _currentProperty.holderAddress != address(msg.sender),
            "You are the owner!"
        );
        require(!_currentUser.isPenalized, "Your are penalized");

        tenantRequests[_propertyId] = _currentUser;

        return true;
    }

    // mülkü kirala - sözleşme başlat (sadece mülk sahibi)
    function startRentalContract(
        bytes32 _propertyId,
        Property memory _propertyType,
        uint256 _startDate,
        uint256 _endDate,
        address _tenantAddress,
        uint256 _createdAt
    ) external nonReentrant returns (bool) {
        Property storage _currentProperty = propertiesMap[_propertyId];
        require(msg.sender == _currentProperty.holderAddress);
        _currentProperty.tenantAddress = _tenantAddress;
        bytes32 _id = keccak256(
            abi.encode(
                _propertyId,
                address(msg.sender),
                _tenantAddress,
                _createdAt
            )
        );

        RentalContract memory rentalContract = RentalContract({
            id: _id,
            holderAddress: address(msg.sender),
            hirerAddress: _tenantAddress,
            property: _propertyType,
            startDate: _startDate,
            endDate: _endDate,
            isActive: true,
            isEarlyEndRequest: false
        });

        rentalContracts.push(rentalContract);
        rentalContractsMap[_id] = rentalContract;

        return true;
    }

    // sözleşmeyi sonlandır (erken tarih kontrolü)
    function finishRentalContract(
        bytes32 _rentalContractId,
        uint256 _date
    ) external nonReentrant {
        RentalContract storage _rentalContract = rentalContractsMap[
            _rentalContractId
        ];

        if (_date + 15 < _rentalContract.endDate) {
            revert("Time is not enough");
        } else {
            _rentalContract.isActive = false;
        }
    }

    // şikayet et (mülk sahibi veya kiracı)
    /*
    function makeComplaint(bytes32 _propertyId, string memory _reason, uint256 _createdAt) external nonReentrant returns(bool){
        Property memory _currentProperty = propertiesMap[_propertyId];
        require(_currentProperty.holderAddress == address(msg.sender) || _currentProperty.tenantAddress == msg.sender, "lack of authorize");
        bytes32 _id =  keccak256(abi.encode(_propertyId, address(msg.sender), _createdAt));
        
        Complaint memory complaint = Complaint({
            id: _id,
            complainantAddress: address(msg.sender),
            reportedAddress: _currentProperty.holderAddress,
            reason: _reason,
            property: _currentProperty,
            isControlled:false,
            isValid:false
        });

        complaints.push(complaint);
        complaintsMap[_id] = complaint;

        return true;
    }
    */

    // şikayeti kontrol et (şikayetin geçerlilik kontrolünü sağla, cezalı listesine koy veya şikayeti aktiflikten çıkar - admin)
    /*
    function controlComplaint(bytes32 _complaintId, bool _isValid) external onlyOwner returns(bool) {
        Complaint storage _currentComplaint = complaintsMap[_complaintId];
        User storage _currentUser = usersMap[_currentComplaint.reportedAddress];

        _currentComplaint.isControlled = true;
        _currentComplaint.isValid = _isValid;

        if(_isValid) {
            _currentUser.isPenalized = true;
        }
        
        return true;
    }
    */
}
