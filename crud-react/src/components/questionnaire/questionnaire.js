import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const enumOptions = ["Option A", "Option B", "Option C"];

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const navigate = useNavigate();

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

    const handleInputChange = (questionID, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionID]: value,
        }));
    };

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

                        {/* Types of responses based on Options */}
                        {question.Options === 1 && (
                            <Form.Control
                                placeholder="Digite o numero"
                                type="number"
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}

                        {question.Options === 2 && (
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </Form.Select>
                        )}

                        {question.Options === 3 && (
                            // Renders a list of options from 1 to 5 in a dropdown select element. 
                            // Each option is rendered with a unique `key` prop and the `value` prop 
                            // is set to the current number in the iteration.
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </Form.Select>
                        )}

                        {question.Options === 4 && (
                            // Renders a list of options from the `enumOptions` array in a dropdown select element. 
                            // Each option is rendered with a unique `key` prop and the `value` prop is set to the current option value.
                            <Form.Select onChange={(e) => handleInputChange(question._id, e.target.value)}>
                                {enumOptions.map((opt, index) => (
                                    <option key={index} value={opt}>{opt}</option>
                                ))}
                            </Form.Select>
                        )}

                        {question.Options === 5 && (
                            <Form.Control
                                type="number"
                                placeholder="Digite o tempo em minutos"
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}

                        {question.Options === 6 && (
                            <Form.Control
                                type="text"
                                placeholder="Escreva a resposta"
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
