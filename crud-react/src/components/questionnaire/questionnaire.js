import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const enumOptions = ["Option A", "Option B", "Option C"]; // Substitua pelos valores corretos

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const navigate = useNavigate();

    // Buscar perguntas do banco de dados
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/question");
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    // Atualiza a resposta de uma pergunta
    const handleInputChange = (questionID, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionID]: value,
        }));
    };

    // Submeter respostas ao backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ responses }),
            });
            const data = await response.json();
            console.log("Submission response:", data);
            navigate("/");
        } catch (error) {
            console.error("Error submitting responses:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Questionnaire</h1>
            <Form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <Form.Group key={question._id} className="mb-3">
                        <Form.Label>{question.TextQuestion}</Form.Label>

                        {/* Tipos de respostas baseados em Options */}
                        {question.Options === 1 && (
                            <Form.Control
                                type="number"
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}

                        {question.Options === 2 && (
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                <option value="">Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        )}

                        {question.Options === 3 && (
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                <option value="">Select</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Select>
                        )}

                        {question.Options === 4 && (
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                <option value="">Select</option>
                                {enumOptions.map((opt, index) => (
                                    <option key={index} value={opt}>{opt}</option>
                                ))}
                            </Form.Select>
                        )}

                        {question.Options === 5 && (
                            <Form.Control
                                type="number"
                                placeholder="Enter time in minutes"
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}

                        {question.Options === 6 && (
                            <Form.Control
                                type="text"
                                placeholder="Enter your response"
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}
                    </Form.Group>
                ))}

                <Button variant="primary" type="submit" className="w-100">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Questionnaire;
