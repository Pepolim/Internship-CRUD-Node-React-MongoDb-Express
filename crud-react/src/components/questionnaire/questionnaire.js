import React, { useState, useEffect } from "react";

const Questionnaire = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({}); // Guarda as respostas do usuário

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/question");
            const data = await response.json();
            setQuestions(data);

            // Inicializa as respostas vazias para cada pergunta
            const initialResponses = {};
            data.forEach((question) => {
                initialResponses[question._id] = ""; // Define uma resposta vazia para cada pergunta
            });
            setResponses(initialResponses);
        } catch (error) {
            console.error("Erro ao buscar perguntas:", error);
        }
    };

    const handleInputChange = (questionId, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: "USER_ID_AQUI", // Trocar pelo ID do usuário autenticado
                    responses: Object.entries(responses).map(([questionID, responseValue]) => ({
                        questionID,
                        responseValue,
                        responseDate: new Date(),
                    })),
                }),
            });

            if (response.ok) {
                console.log("Respostas enviadas com sucesso!");
            } else {
                console.error("Erro ao enviar respostas.");
            }
        } catch (error) {
            console.error("Erro ao enviar respostas:", error);
        }
    };

    return (
        <div>
            <h1>Questionário</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question._id}>
                        <label>{question.TextQuestion}</label>

                        {/* Tipo 1: Campo de Texto */}
                        {question.Options === 1 && (
                            <input
                                type="text"
                                value={responses[question._id] || ""}
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            />
                        )}

                        {/* Tipo 2: Escala Likert (1 a 5) */}
                        {question.Options === 2 && (
                            <select
                                value={responses[question._id] || ""}
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            >
                                <option value="">Selecione</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Tipo 3: Booleano (Sim/Não) */}
                        {question.Options === 3 && (
                            <select
                                value={responses[question._id] || ""}
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        )}

                        {/* Tipo 4: Enum (Lista de Opções) */}
                        {question.Options === 4 && (
                            <select
                                value={responses[question._id] || ""}
                                onChange={(e) => handleInputChange(question._id, e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="Option1">Opção 1</option>
                                <option value="Option2">Opção 2</option>
                                <option value="Option3">Opção 3</option>
                            </select>
                        )}
                    </div>
                ))}
                <button type="submit">Enviar Respostas</button>
            </form>
        </div>
    );
};

export default Questionnaire;
