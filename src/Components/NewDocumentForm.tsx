import { useState } from "react";
import { toast } from "react-toastify";

const NewDocumentForm = (props: any) => {
  const [form, setForm] = useState({
    text: "",
    title: "",
    image: "",
    date: null,
    type: "simple",
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (form.image && form.date) {
      setForm((prev) => ({ ...prev, type: "advanced" }));
    } else if (!form.image && form.date) {
      setForm((prev) => ({ ...prev, type: "custom" }));
    }
    setTimeout(() => {
      if (!form.title && !form.date) {
        toast.error("Please fill out the fields");
      } else {
        props.addNewDocument(form);
        props.setShowNewDocumentForm(false);
        toast.success("New document created!");
      }
    }, 300);
  };

  const onTextChange = (e: any) => {
    setForm((prev) => ({ ...prev, text: e.target.value }));
  };

  const onTitleChange = (e: any) => {
    setForm((prev) => ({ ...prev, title: e.target.value }));
  };

  const onImageUpload = (e: any) => {
    setForm((prev) => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const onDateChange = (e: any) => {
    setForm((prev) => ({ ...prev, date: e.target.value }));
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input onChange={onTitleChange} type="text" id="title" />
        <br />
        <br />
        <label htmlFor="text">Text</label>
        <textarea onChange={onTextChange} id="text" />
        <br />
        <br />

        <label htmlFor="image">Image</label>
        {form.image ? (
          <img src={form.image} height={"50px"} width={"50px"} alt="cover" />
        ) : null}
        <input
          onChange={onImageUpload}
          type="file"
          accept="image/*"
          id="image"
          alt="image-upload"
        />

        <br />
        <br />
        <label htmlFor="date">Date</label>
        <input onChange={onDateChange} type="date" id="date" />
        <br />
        <br />
        <button
          onClick={() => {
            props.setShowNewDocumentForm(false);
          }}
        >
          close
        </button>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewDocumentForm;
