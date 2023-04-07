import React, { useState } from "react";
import { useAddQuizMutation } from "../../../features/quiz/quizSlice";
import { useGetVideosQuery } from "../../../features/videos/videoSlice";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import TextInput from "../../ui/TextInput";

const QuizModal = ({ handleCloseModal, showModal }) => {
  const [addQuiz, { isLoading, isSuccess, isError }] = useAddQuizMutation();
  const { data: videos } = useGetVideosQuery();
  const [questionTitle, setQuestionTitle] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [video_id, setVideo_id] = useState("");
  const [questions, setQuestions] = useState([]);
  const videoSelected = videos?.find((video) => video.id === Number(video_id));

  const resetForm = () => {
    setQuestionTitle("");
    setQuestions([]);
    setVideo_title("");
    setVideo_id("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quizOptions = questions.map((question, index) => ({
      id: index + 1,
      option: question.option,
      isCorrect: question.isCorrect,
    }));
    addQuiz({
      question: questionTitle,
      video_id: videoSelected?.id || "",
      video_title: videoSelected?.title || "",
      options: quizOptions,
    });
    resetForm();
    handleCloseModal(false);
  };

  const handleCancle = () => {
    resetForm();
    handleCloseModal(false);
  };

  function handleAddQuestion() {
    const newQuestion = {
      question: "",
      options: [{ optionText: "", isCorrect: false }],
    };
    setQuestions([...questions, newQuestion]);
  }

  function handleQuestionChange(questionIndex, event) {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][name] = value;
    setQuestions(updatedQuestions);
  }

  function handleOptionChange(questionIndex, optionIndex, event) {
    const { name, value } = event.target;
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex][name] = value;
    setQuestions(updatedQuestions);
  }

  function handleCheckboxChange(questionIndex, optionIndex) {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].isCorrect =
      !updatedQuestions[questionIndex].options[optionIndex].isCorrect;
    setQuestions(updatedQuestions);
  }

  return (
    <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
      {/* <button onClick={() => setShowModal(true)}>Add Video</button> */}
      {showModal && (
        <div>
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h2 className="mb-8 text-xl font-bold text-center">Add Quiz</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 ">
                      <label className="block text-sm font-medium text-gray-700">
                        Assign To
                      </label>
                      <select
                        name="video"
                        id="lws-video"
                        required
                        className="px-3 py-3 text-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={video_id}
                        onChange={(e) => {
                          setVideo_id(e.target.value);
                          setVideo_title(
                            e.target.options[e.target.selectedIndex].text
                          );
                        }}
                      >
                        <option value="" hidden defaultValue>
                          Select Video
                        </option>
                        {videos?.map((video) => (
                          <option key={video.id} value={video.id}>
                            {video.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Video Title"
                        value={video_title}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Video Id"
                        value={video_id}
                      />
                    </div>

                    <div>
                      <div>
                        {questions.map((question, questionIndex) => (
                          <div
                            key={questionIndex}
                            className="col-span-6 sm:col-span-3 lg:col-span-2"
                          >
                            <label>
                              Question {questionIndex + 1}:
                              <TextInput
                                type="text"
                                name="question"
                                value={question.question}
                                onChange={(event) =>
                                  handleQuestionChange(questionIndex, event)
                                }
                              />
                            </label>
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex}>
                                <label>
                                  Option {optionIndex + 1}:
                                  <TextInput
                                    type="text"
                                    name="optionText"
                                    value={option.optionText}
                                    onChange={(event) =>
                                      handleOptionChange(
                                        questionIndex,
                                        optionIndex,
                                        event
                                      )
                                    }
                                  />
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    name="isCorrect"
                                    checked={option.isCorrect}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        questionIndex,
                                        optionIndex
                                      )
                                    }
                                  />
                                  Is Correct
                                </label>
                                {optionIndex ===
                                  question.options.length - 1 && (
                                  <button
                                    className="btn ml-2 mt-3"
                                    type="button"
                                    onClick={() => {
                                      const updatedQuestions = [...questions];
                                      updatedQuestions[
                                        questionIndex
                                      ].options.push({
                                        optionText: "",
                                        isCorrect: false,
                                      });
                                      setQuestions(updatedQuestions);
                                    }}
                                  >
                                    {"   "}Add Option
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                        <button
                          className="btn ml-2 mt-3"
                          type="button"
                          onClick={handleAddQuestion}
                        >
                          + Add Question
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn ml-2 mt-3"
                  >
                    Save
                  </button>

                  <button
                    disabled={isLoading}
                    className="btn ml-2 mt-3"
                    onClick={handleCancle}
                  >
                    Cancel
                  </button>
                </div>

                {isSuccess && (
                  <Success message="Video was added successfully" />
                )}
                {isError && (
                  <Error message="There was an error adding video!" />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizModal;
