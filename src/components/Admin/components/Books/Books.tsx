import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { FieldValues, useForm } from "react-hook-form";
import { any, set, z } from "zod";
import styles from "./Books.module.scss";
import { useEffect, useState } from "react";
import { Languages, Genres } from "../../../../data/BooksData";
import { addBook, getAllBooks } from "../../../../services/books.service";
import PdfViewer from "../../../PdfViewer/PdfViewer";

const schema = z.object({
  name: z.string().min(3),
  author: z.string(),
  publication: z.string(),
  publicationYear: z
    .number({ invalid_type_error: "This field is required" })
    .min(1700, "Publication year must greater than 1700's")
    .max(2024, "Publication year must less than 2024's"),
  genre: z.string(),
  language: z.string(),
  pdf: any(),
  coverPage: any(),
});

type FormData = z.infer<typeof schema>;

const Books = () => {
  const [statusMessage, setStatusMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [modal, setModal] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [curUrl, setCurUrl] = useState("");
  const [pdfModal, setPdfModal] = useState(false);

  useEffect(() => {
    getAllBooks()
      .then((res) => {
        setBooksData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, [statusMessage]);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("activeModal");
  } else {
    document.body.classList.remove("activeModal");
  }

  function setStatusMessage(msg: string, type?: string) {
    setStatusMsg(msg);
    if (type != "file") {
      setTimeout(() => {
        setStatusMsg("");
      }, 3000);
    }
  }
  const onSubmit = (formData: FieldValues) => {
    const data = new FormData();
    console.log(formData.name);
    {
      data.append("name", formData.name);
      data.append("author", formData.author);
      data.append("publication", formData.publication);
      data.append("publicationYear", formData.publicationYear);
      data.append("language", formData.language);
      data.append("genre", formData.genre);
      data.append("pdf", formData.pdf[0]);
      data.append("coverPage", formData.coverPage[0]);
      setStatusMessage("Upload data...", "file");
    }

    addBook(data)
      .then((res) => {
        setStatusMessage("Data uploaded.");
        reset();
        getAllBooks()
          .then((res) => setBooksData(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={[styles.mainContainer].join(" ")}>
        <div className={styles.booksData}>
          <span className={styles.title}>Books Data</span>
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Title</th>
                <th>Author</th>
                <th>Edition</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {booksData.length == 0 ? (
                <tr>
                  <td colSpan={4}>No data available</td>
                </tr>
              ) : null}
              {booksData?.map((item, index) => {
                return (
                  <tr key={item["_id"]}>
                    <td>{index + 1}</td>
                    <td>{item["name"]}</td>
                    <td>{item["author"]}</td>
                    <td>{item["publicationYear"]}</td>
                    <td>
                      <button
                        onClick={() => {
                          setCurUrl(item["pdf"]);
                          setPdfModal(true);
                        }}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {pdfModal && (
          <div className={styles.modal}>
            <div onClick={toggleModal} className={styles.overlay}></div>
            <div className={styles.modalContent}>
              <i
                className={"fa-solid fa-xmark " + styles.pdfModalClose}
                onClick={() => setPdfModal(false)}
              ></i>

              <PdfViewer url={curUrl} />
            </div>
          </div>
        )}

        {/* <PdfViewer url={curUrl} /> */}
        {statusMessage && (
          <div className={styles.statusMessage}>{statusMessage}</div>
        )}
        <i
          onClick={toggleModal}
          className={
            "fa-sharp fa-solid fa-plus " +
            styles.btnModal +
            " " +
            (modal ? styles.closeModal : null)
          }
        ></i>

        {modal && (
          <div className={styles.modal}>
            <div onClick={toggleModal} className={styles.overlay}></div>
            <div className={styles.modalContent}>
              <form
                id="form"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Enter book name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book name"
                    {...register("name")}
                    required
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Enter author name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("author")}
                    placeholder="Author"
                    required
                  />
                  {errors.author && (
                    <p className="text-danger">{errors.author.message}</p>
                  )}
                </div>
                <div className="mb-3 publication">
                  <label htmlFor="publication" className="form-label">
                    Enter publication name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="publication"
                    {...register("publication")}
                    placeholder="Publication"
                    required
                  />
                  {errors.publication && (
                    <p className="text-danger">{errors.publication.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="publicationYear" className="form-label">
                    Year of Publication :
                  </label>
                  <input
                    type="number"
                    {...register("publicationYear", { valueAsNumber: true })}
                    className="form-control"
                    required
                  />
                  {errors.publicationYear && (
                    <p className="text-danger">
                      {errors.publicationYear.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    {" "}
                    Select Language{" "}
                  </label>
                  <select
                    className="form-select"
                    {...register("language")}
                    required
                  >
                    <option selected></option>
                    {Languages.map((language, index) => {
                      return (
                        <option key={index} value={language.toLowerCase()}>
                          {language}
                        </option>
                      );
                    })}
                  </select>
                  {errors.language && (
                    <p className="text-danger">{errors.language.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    {" "}
                    Select Genre{" "}
                  </label>
                  <select
                    className="form-select"
                    {...register("genre")}
                    required
                  >
                    <option selected></option>
                    <option value="mystery">Mystery</option>
                    {Genres.map((genre, index) => {
                      return (
                        <option
                          key={index}
                          value={genre.toLowerCase().replace(" ", "_")}
                        >
                          {genre}
                        </option>
                      );
                    })}
                  </select>
                  {errors.genre && (
                    <p className="text-danger">{errors.genre.message}</p>
                  )}
                </div>
                <div className={["mb-3", styles.pdf].join(" ")}>
                  <label className="form-label" htmlFor="pdf">
                    Select pdf file :
                  </label>
                  <input
                    type="file"
                    size={20}
                    accept=".pdf"
                    {...register("pdf")}
                  />
                </div>
                <div className={["mb-3", styles.coverPage].join(" ")}>
                  <label className="form-label" htmlFor="pdf">
                    Select cover page :
                  </label>
                  <input
                    type="file"
                    {...register("coverPage")}
                    accept=".png , .jpeg, .jpg"
                  />
                </div>
                <div className={styles.actionBtns}>
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={statusMessage === "Upload data..." ? true : false}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={toggleModal}
                    disabled={statusMessage === "Upload data..." ? true : false}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Books;
