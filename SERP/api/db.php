<?php
class serpDb {
    private $conn;

    public function __construct() {
        $config = parse_ini_file(__DIR__ . '/config.ini', true);
        if (!$config || !isset($config['database'])) {
            die(json_encode(["status" => "error", "message" => "Failed to load database configuration."]));
        }

        $db = $config['database'];
        $this->conn = new mysqli($db['host'], $db['user'], $db['password'], $db['dbname']);

        if ($this->conn->connect_error) {
            die(json_encode(["status" => "error", "message" => "Database connection failed"]));
        }
    }

    // Fetch user by ID
    public function getUserById($user_id) {
        $stmt = $this->conn->prepare("SELECT id, username, email FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    // Save a new campaign
    public function saveCampaign($user_id, $campaign_name, $domain_name, $keywords, $search_engine) {
        $user_id = intval($user_id);
        $campaign_name = $this->conn->real_escape_string($campaign_name);
        $domain_name = $this->conn->real_escape_string($domain_name);
        $keywords = $this->conn->real_escape_string($keywords);
        $search_engine = $this->conn->real_escape_string($search_engine);

        $sql = "INSERT INTO saved_campaigns (user_id, campaign_name, domain_name, keywords, search_engine, created_at) 
                VALUES ('$user_id', '$campaign_name', '$domain_name', '$keywords', '$search_engine', NOW())";

        if ($this->conn->query($sql) === TRUE) {
            return $this->conn->insert_id;
        } else {
            throw new Exception("Database error: " . $this->conn->error);
        }
    }

    // Update an existing campaign
    public function updateCampaign($campaign_id, $user_id, $campaign_name, $domain_name, $keywords, $search_engine) {
        $campaign_id = intval($campaign_id);
        $user_id = intval($user_id);
        $campaign_name = $this->conn->real_escape_string($campaign_name);
        $domain_name = $this->conn->real_escape_string($domain_name);
        $keywords = $this->conn->real_escape_string($keywords);
        $search_engine = $this->conn->real_escape_string($search_engine);

        $sql = "UPDATE saved_campaigns 
                SET campaign_name='$campaign_name', 
                    domain_name='$domain_name', 
                    keywords='$keywords', 
                    search_engine='$search_engine' 
                WHERE id='$campaign_id' AND user_id='$user_id'";

        if ($this->conn->query($sql) === TRUE) {
            return true;
        } else {
            throw new Exception("Database error: " . $this->conn->error);
        }
    }

    // Fetch saved campaigns for a user
    public function getSavedCampaigns($user_id) {
        $user_id = intval($user_id);
        $sql = "SELECT id AS campaign_id, campaign_name, domain_name, keywords, search_engine 
                FROM saved_campaigns 
                WHERE user_id = '$user_id'";

        $result = $this->conn->query($sql);

        $campaigns = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $campaigns[] = $row;
            }
        }
        return $campaigns;
    }

    // Delete campaign
    public function deleteCampaign($campaign_id, $user_id) {
        $stmt = $this->conn->prepare("DELETE FROM saved_campaigns WHERE id = ? AND user_id = ?");
        $stmt->bind_param("ii", $campaign_id, $user_id);

        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Database error: " . $stmt->error);
        }
    }

    // Get user by email
    public function getUserByEmail($email) {
        $email = $this->conn->real_escape_string($email);
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $this->conn->query($sql);

        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        return null;
    }

    // Insert login record
    public function insertLoginRecord($user_id, $email, $ip_address) {
        $login_time = date("Y-m-d H:i:s");
        $sql = "INSERT INTO login (user_id, email, login_time, ip_address) 
                VALUES ('$user_id', '$email', '$login_time', '$ip_address')";
        return $this->conn->query($sql);
    }

    // Close DB connection
    public function close() {
        $this->conn->close();
    }
    

     // Register a new user
public function registerUser($name, $email, $password) {
    $name = $this->conn->real_escape_string($name);
    $email = $this->conn->real_escape_string($email);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $this->conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        return $this->conn->insert_id;
    } else {
        throw new Exception("Database error: " . $stmt->error);
    }
}


public function updatePasswordByEmail($email, $hashedPassword) {
    $stmt = $this->conn->prepare("UPDATE users SET password = ? WHERE email = ?");
    return $stmt->execute([$hashedPassword, $email]);
}

}
?>
