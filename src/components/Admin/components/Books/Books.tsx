import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { any, set, z } from "zod";
import styles from "./Books.module.scss";
import { useEffect, useState } from "react";
import { Languages, Genres, Editions } from "../../../../data/BooksData";
import { addBook, getAllBooks } from "../../../../services/books.service";
import PdfViewer from "../../../PdfViewer/PdfViewer";
import Book from "../../../../entities/Book";
import { replaceAll } from "../../../../common/common";

const schema = z.object({
  name: z.string().min(3),
  author: z.string().min(1, "This field is required"),
  publication: z.string().min(1, "This field is required"),
  publicationYear: z.number({ invalid_type_error: "This field is required" }),
  // .min(1700, "Publication year must greater than 1700's")
  // .max(2024, "Publication year must less than 2024's")z,
  isbn: z.string(),
  genre: z.string().min(1, "This field is required"),
  language: z.string().min(1, "This field is required"),
  edition: z.string().min(1, "This field is required"),
  about: z.string().min(20, "Minimum 20 charaters required."),
  pdf: any(),
  coverPage: any(),
  tags: z.string(),
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
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [curUrl, setCurUrl] = useState("");
  const [pdfModal, setPdfModal] = useState(false);
  const [pdfPages, setPdfPages] = useState(0);

  const pagesInPdf = (event: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onloadend = () => {
      const result = reader?.result as string;
      setPdfPages(result.match(/\/Type[\s]*\/Page[^s]/g)!.length);
    };
    return pdfPages;
  };
  const loadBooksData = () => {
    getAllBooks()
      .then((res) => {
        setBooksData(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    loadBooksData();
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
  const user = "admin";
  const onSubmit = (formData: FieldValues) => {
    const data = new FormData();
    {
      data.append("name", formData.name);
      data.append("author", formData.author);
      data.append("publication", formData.publication);
      data.append("publicationYear", formData.publicationYear);
      data.append("isbn", formData.isbn);
      data.append("language", formData.language);
      data.append("genre", formData.genre);
      data.append("edition", formData.edition);
      data.append("pdf", formData.pdf[0]);
      data.append("coverPage", formData.coverPage[0]);
      data.append("about", formData.about);
      data.append("pages", pdfPages.toString());
      data.append("tags", formData.tags);
      data.append("added_by", user);
    }
    setStatusMessage("Upload data...", "file");
    console.log(data);
    addBook(data)
      .then((res) => {
        setStatusMessage("Data uploaded.");
        reset();

        loadBooksData();
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
                <div className={styles.mb}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Enter book name :
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Book name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="author" className={styles.formLabel}>
                    Enter author name :
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    {...register("author")}
                    placeholder="Author"
                  />
                  {errors.author && (
                    <p className="text-danger">{errors.author.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="publication" className={styles.formLabel}>
                    Enter publication name :
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="publication"
                    {...register("publication")}
                    placeholder="Publication"
                  />
                  {errors.publication && (
                    <p className="text-danger">{errors.publication.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="publicationYear" className={styles.formLabel}>
                    Year of Publication :
                  </label>
                  <input
                    type="number"
                    {...register("publicationYear", { valueAsNumber: true })}
                    className={styles.formControl}
                  />
                  {errors.publicationYear && (
                    <p className="text-danger">
                      {errors.publicationYear.message}
                    </p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="isbn" className={styles.formLabel}>
                    Isbn :
                  </label>
                  <input
                    type="text"
                    {...register("isbn")}
                    className={styles.formControl}
                  />
                  {errors.isbn && (
                    <p className="text-danger">{errors.isbn.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="language" className={styles.formLabel}>
                    {" "}
                    Select Language{" "}
                  </label>
                  <select
                    className={styles.formSelect}
                    defaultValue={""}
                    {...register("language")}
                  >
                    <option value=""></option>
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
                <div className={styles.mb}>
                  <label htmlFor="genre" className={styles.formLabel}>
                    {" "}
                    Select Genre{" "}
                  </label>
                  <select
                    defaultValue={""}
                    className={styles.formSelect}
                    {...register("genre")}
                  >
                    <option value=""></option>
                    <option value="mystery">Mystery</option>
                    {Genres.map((genre, index) => {
                      return (
                        <option
                          key={index}
                          value={replaceAll(genre.toLowerCase(), " ", "_")}
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
                <div className={styles.mb}>
                  <label htmlFor="edition" className={styles.formLabel}>
                    {" "}
                    Select Edition{" "}
                  </label>
                  <select
                    defaultValue={""}
                    className={styles.formSelect}
                    {...register("edition")}
                  >
                    <option value=""></option>
                    {Editions.map((edition, index) => {
                      return (
                        <option
                          key={index}
                          value={replaceAll(edition.toLowerCase(), " ", "_")}
                        >
                          {edition}
                        </option>
                      );
                    })}
                  </select>
                  {errors.edition && (
                    <p className="text-danger">{errors.edition.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="about" className={styles.formLabel}>
                    About
                  </label>
                  <textarea
                    id="about"
                    className={styles.formControl}
                    {...register("about")}
                  ></textarea>
                  {errors.about && (
                    <p className="text-danger">{errors.about.message}</p>
                  )}
                </div>
                <div className={styles.mb}>
                  <label htmlFor="tags" className={styles.formLabel}>
                    Tags :
                  </label>
                  <input
                    type="text"
                    className={styles.formControl}
                    id="tags"
                    {...register("tags")}
                    placeholder="Enter tags for book."
                  />
                  {errors.tags && (
                    <p className="text-danger">{errors.tags.message}</p>
                  )}
                </div>
                <div className={[styles.mb, styles.pdf].join(" ")}>
                  <label className={styles.formLabel} htmlFor="pdf">
                    Select pdf file :
                  </label>
                  <input
                    type="file"
                    size={20}
                    accept=".pdf"
                    {...register("pdf")}
                    onChange={pagesInPdf}
                  />
                </div>
                <div className={[styles.mb, styles.coverPage].join(" ")}>
                  <label className={styles.formLabel} htmlFor="pdf">
                    Select cover page :
                  </label>
                  <input
                    type="file"
                    {...register("coverPage")}
                    accept=".png , .jpeg, .jpg"
                    required
                  />
                </div>
                <div className={styles.actionBtns}>
                  {" "}
                  <button
                    type="submit"
                    className={styles.btn + " " + styles.btnPrimary}
                    disabled={statusMessage === "Upload data..." ? true : false}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className={styles.btn + " " + styles.btnDanger}
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
