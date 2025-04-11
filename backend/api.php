<?php

    include 'connection.php';
    include 'header.php';

    $action = isset($_GET['action']) ? $_GET['action'] : '';

    switch($action) {
        case 'addProduct':
            addProduct();
            break;
        case 'getCustomerAcc':
            getCustomerAcc();
            break;
        case 'fetchCategoryList':
            fetchCategoryList();
            break;
        case 'adminlogin':
            adminlogin();
            break;
        case 'adminCode':
            adminCode();
            break;
        case 'customerlogin':
            customerlogin();
            break;
        case 'register':
            registerCustomerAcc();
            break;
        case 'fetchDataInventory':
            fetchDataInventory();
            break;
        default:
            echo "Error";
            break;
    }

    function findCategoryId($category_name) {
        global $conn;

        $stmt = $conn->prepare("SELECT category_id FROM category WHERE category_name = ?");
        $stmt->bind_param("s", $category_name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            return $result->fetch_assoc()['category_id'];
        } else {
            return null;
        }
    }

    function addProduct() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $item_name = $data['productName'];
        $description = $data['description'];
        $img = $data['img'];
        $img = base64_encode($img);
        $quantity_in_stock = $data['qty'];
        $unit_price = $data['unitPrice'];
        $category = $data['category'];
        $date_added = date('Y-m-d H:i:s');
        $last_updated = date('Y-m-d H:i:s');

        $category_id = findCategoryId($category);

        if ($category_id === null) {
            echo json_encode(['error' => 'Category not found']);
            return;
        }

        $stmt = $conn->prepare("SELECT * FROM inventory WHERE item_name = ? AND category_id = ?");
        $stmt->bind_param("si", $item_name, $category_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(['error' => 'Product already exists in this category']);
            return;
        }else {
            $stmt = $conn->prepare("INSERT INTO inventory (item_name, description, quantity_in_stock, unit_price, category_id, item_picture) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssisib", $item_name, $description, $quantity_in_stock, $unit_price, $category_id, $img);
            
            if($stmt->execute()){
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['error' => 'Failed to add product']);
            }
        }

        $stmt->close();
    }

    function fetchCategoryList() {
        global $conn;

        $stmt = $conn->prepare("SELECT category_id, category_name FROM category");
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        
        header('Content-Type: application/json');
        echo json_encode($data);
        $stmt->close();
    }

    function fetchDataInventory() {
        global $conn;

        $stmt = $conn->prepare("SELECT
                                    inventory.item_id, 
                                    inventory.item_name, 
                                    inventory.description, 
                                    inventory.quantity_in_stock, 
                                    inventory.unit_price, 
                                    inventory.date_added, 
                                    category.category_id, 
                                    category.category_name
                                FROM inventory 
                                LEFT JOIN category ON inventory.category_id = category.category_id");
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
            while($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        
        header('Content-Type: application/json');
        echo json_encode($data);
        $stmt->close();
    }

    function getCustomerAcc() {
        global $conn;

        $stmt = $conn->prepare("SELECT customer_id, first_name, last_name, email, address, province, city, phone_number , username FROM customer");
        $stmt->execute();
        $result = $stmt->get_result();
    
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    
        header('Content-Type: application/json');
        echo json_encode($data);
        $stmt->close();
    }

    function registerCustomerAcc() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $first_name = $data['firstname'];
        $last_name = $data['lastname'];
        $email = $data['email'];
        $address = $data['address'];
        $province = $data['province'];
        $city = $data['city'];
        $postal_code = $data['postal_code'];
        $country = $data['country'];
        $phone_number = $data['phone_number'];
        $username = $data['username'];
        $password = $data['password'];
        $date_added = date('Y-m-d H:i:s');
        $last_updated = date('Y-m-d H:i:s');
        $status = 'active';

        // Hash the password before storing it
        $password = password_hash($password, PASSWORD_BCRYPT);

        // Check if the username already exists
        $stmt = $conn->prepare("SELECT * FROM customer WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['error' => 'Username already exists']);
            return;
        }else{
        // Check if the email already exists
            $stmt = $conn->prepare("SELECT * FROM customer WHERE email = ?");   
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                echo json_encode(['error' => 'Email already exists']);
                return;
            }else{
                // Prepare and bind
                $stmt = $conn->prepare("INSERT INTO 
                    customer (
                        first_name, 
                        last_name, 
                        email, 
                        address, 
                        province, 
                        city, 
                        postal_code, 
                        country, 
                        phone_number, 
                        username, 
                        password,  
                        status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssisisss", $first_name, $last_name, $email, $address, $province, $city, $postal_code, $country, $phone_number, $username, $password, $status);
                if($stmt->execute()){
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['error' => 'Failed to register customer account']);
                }
                $stmt->close();
            }
        }
    }

    function customerlogin() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $username = $data['username'];
        $password = $data['password'];

        $stmt = $conn->prepare("SELECT * FROM customer WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                echo json_encode(['success' => true, 'user' => $row['username']]);
            } else {
                echo json_encode(['error' => 'Invalid username']);
            }
        $stmt->close();
    }

    function adminlogin() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $username = $data['username'];
        $password = $data['password'];

        // Fetch the admin by username
        $stmt = $conn->prepare("SELECT * FROM admin WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verify the password using password_verify
            if (password_verify($password, $row['password'])) {
                echo json_encode(['success' => true, 'user' => $row['typeOfAcc']]);
            } else {
                echo json_encode(['error' => 'Invalid password']);
            }
        } else {
            echo json_encode(['error' => 'Invalid username']);
        }
        $stmt->close();
    }

    function  adminCode() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $admin_code = $data['adminCode']; // This is the plain text admin code entered by the user

        // Fetch the hashed admin code from the database
        $stmt = $conn->prepare("SELECT password FROM admin WHERE admin_id = 4");
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row) {
            $hashedAdminCode = $row['password']; // The hashed admin code stored in the database

            // Verify the entered code against the hashed code
            if (password_verify($admin_code, $hashedAdminCode)) {
                echo json_encode(['success' => true, 'message' => 'Admin Code Accepted']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid Admin Code']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Admin Code not found']);
        }

        $stmt->close();
    }

?>