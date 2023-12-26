import { useState } from "react";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewTaskModel({ handleClose, handleShow, show }) {
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date("2023-11-15"));
  const [image, setImage] = useState(null);
  const datePickerRef = useRef(null);
  const imagePickRef = useRef(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const handleDateButtonClick = () => {
    // Focus on the DatePicker when the button is clicked
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle the selected image file
    setImage(file);
  };

  const handleImageButtonClick = () => {
    if (imagePickRef.current) {
      imagePickRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Body style={{height:'580px'}}>
          <form
            className=" w-96 h-120 flex flex-col p-4 gap-4 mx-auto my-auto"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-blue-950 text-2xl">New Task</h1>

            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="Title"
              onChange={handleTitleChange}
              className="border border-gray-300 bg-blue-200 rounded-lg px-2 py-1"
            />

            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="Description"
              onChange={handleDescriptionChange}
              className="border border-gray-300 bg-blue-200 rounded-lg px-2 py-1 h-[13rem]"
            />

            <div className="flex items-center rounded-md relative gap-2 border border-gray-300">
              <label
                htmlFor="dueDate"
                className="text-gray-600 text-sm font-medium ml-2"
              >
                Due:
              </label>
              <span className="text-gray-600 text-sm font-medium">
                <DatePicker
                  selected={dueDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  className="rounded-lg  py-1"
                  ref={datePickerRef}
                />
              </span>
              <button
                type="button"
                onClick={handleDateButtonClick}
                className="border border-gray-300 rounded-r-md w-[110px] py-1  bg-gray-600 text-white hover:bg-gray-300 ml-auto"
              >
                Change
              </button>
            </div>
            <div className="flex items-center rounded-md relative gap-2 border border-gray-300">
              <span className="text-gray-600 text-sm font-medium ml-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={imagePickRef}
                  onChange={handleImageChange}
                />
                {image ? <span>{image.name}</span> : <span>No image...</span>}
              </span>
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="border border-gray-300 rounded-r-md px-4 py-1  bg-gray-600 text-white hover:bg-gray-300 ml-auto"
              >
                Add image
              </button>
            </div>
            <div className="flex justify-center space-x-[90px] gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-[100px] rounded-md px-4 py-2  hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[100px] bg-blue-700 text-white rounded-md px-4 py-2  hover:bg-black"
                onClick={handleClose}
              >
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewTaskModel;
