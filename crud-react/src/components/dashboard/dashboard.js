import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error while fetching users: ", error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdate = (userId) => {
        navigate(`/user/${userId}`);
    }

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
                method: "DELETE"
            });
            console.log(response);
            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error("Error while deleting user: ", error.message);
        }
    }

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
        
    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Dashboard Component</h1>
                        {/* Add this search bar */}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search by name, email or role..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user)/*users.map((user)*/ => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button 
                                                variant="dark"
                                                onClick={() => handleUpdate(user._id)}  
                                            >
                                                Update
                                            </Button>{" "}
                                            
                                            <Button 
                                                variant="danger"
                                                onClick={() => handleDelete(user._id)}  
                                            >
                                                Delete
                                            </Button>
                                            
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;