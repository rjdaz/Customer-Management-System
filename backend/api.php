<?php
header('Content-Type: application/json');

    include 'connection.php';
    include 'header.php';

    $action = isset($_GET['action']) ? $_GET['action'] : '';

    switch($action){
        case 'getCustomerAcc':
            getCustomerAcc();
            break;
        case 'add';
            addAdminAcc();
            break;
        case 'adminlogin':
            adminlogin();
            break;
        case 'customerlogin':
            customerlogin();
            break;
        case 'fetchDataInventory':
            fetchDataInventory();
            break;
        default:
            echo "Error";
            break;
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

    function getCustomerAcc(){
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

    function customerlogin(){
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

    function adminlogin(){
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

?>