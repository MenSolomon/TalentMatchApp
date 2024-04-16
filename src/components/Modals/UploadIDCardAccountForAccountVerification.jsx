import { useEffect, useRef, useState } from "react";
import {
  setCloseCircularLoadBackdrop,
  setOpenCircularLoadBackdrop,
  setWarningAlertModalCounter,
  setWarningAlertModalMessage,
} from "../../statemanager/slices/OtherComponentStatesSlice";
import { Button, Modal, Backdrop, Fade, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import idImage from "../../assets/images/MrZImageSample.jpeg";
import {
  selectBlobImageWithMrz,
  selectImageWithMrzFileStore,
  selectImageWithMrzFileStoreForAccountVerification,
  setBlobImageWithMrz,
  setBlobImageWithMrzForAccountVerification,
  setImageWithMrzFileStore,
  setImageWithMrzFileStoreForAccountVerification,
} from "../../statemanager/slices/UserDataSlice";
import { Base64 } from "js-base64";
import InitWorkerForAccountVerification from "../../utilities/MrzScannerCodeForAccountVerification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "65%",
  // height: "94%",
  bgcolor: "background.paper",
  border: "transparent",
  boxShadow: 24,
  borderRadius: "1vw",
  padding: "2vw",
  display: "flex",
  flexDirection: "column",
  paddingTop: "3vh",
};

export default function UploadIDCardAccountForAccountVerification({
  idCardImageWithMrz,
  idCardImageWithoutMrz,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const triggerWarningAlertModal = (message) => {
    dispatch(setWarningAlertModalMessage(message));
    dispatch(setWarningAlertModalCounter());
  };

  const [fileName, setFileName] = useState([]);
  const [file, setFile] = useState([]);
  const [fileIdMRz, setFileIdMrz] = useState([]);

  const fileInputRef = useRef(null);
  const idBackfileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const [videoObject, setVideoObject] = useState({});
  const [vidUrl, setVidUrl] = useState("");

  const mrzImageBase64 = useSelector(
    selectImageWithMrzFileStoreForAccountVerification
  );

  // Assuming you've included the js-base64 library in your project

  // Base64 encoded image (without the data URL prefix)
  // var base64Image = 'iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB...';

  // Decode the base64 image

  console.log(mrzImageBase64);

  // function handleBase64Data(base64Data) {
  //   // Use the base64Data here (e.g., dispatch to Redux)
  //   dispatch(setImageWithMrzFileStoreForAccountVerification(base64Data));
  // }

  // const handleFileSelect = (event) => {
  //   const selectedFiles = event.target.files;
  // {******}
  //   if (selectedFiles.length > 0) {
  //     let worker = InitWorkerForAccountVerification();

  //     var reader = new FileReader();
  //     reader.onload = function (event) {
  //       worker.postMessage({
  //         cmd: "process",
  //         image: event.target.result,
  //       });

  //       const base64Data = btoa(event.target.result);
  //       handleBase64Data(base64Data);
  //     };
  //     if (event.target.files.length) {
  //       reader.readAsDataURL(event.target.files[0]);
  //     }

  //     // Assuming you want to handle each selected file
  //     const file = selectedFiles[0]; // Take the first file

  //     const imageBlob = URL.createObjectURL(file);

  //     if (file.type.startsWith("image/")) {
  //       const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

  //       if (file.size <= maxSizeInBytes) {
  //         console.log("File accepted:", file);
  //         setVideoObject(file); // Store the file itself
  //         setVidUrl(imageBlob);

  //         setFileIdMrz(event.target.files);

  //         // ... (your other logic)
  //         // sessionStorage.setItem("imageData", base64Data);

  //         dispatch(setBlobImageWithMrzForAccountVerification(imageBlob));

  //         // dispatch(setVideoBelow15mbSelected(true));

  //         // Reset the value of the file input element
  //         event.target.value = [];
  //       } else {
  //         triggerWarningAlertModal("File size exceeds the limit (1 MB).");
  //       }
  //     } else {
  //       triggerWarningAlertModal("Please select an image file.");
  //     }
  //   }
  // };

  // Back of Id image Config\
  const [fileNameIdBack, setFileNameIdBack] = useState([]);
  const [fileIdBack, setFileIdBack] = useState([]);

  const handleDragOverIdBack = (e) => {
    e.preventDefault();
  };

  const handleDropIdBack = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    setFileIdBack([...files], "files");
    const fileNames = [];

    if (file.length > 10) {
      // setMaximumPicturesAlert(true);
    } else {
      for (let i = 0; i < files.length; i++) {
        // Getting a new id for each file
        // const fileId = v4();
        fileNames.push({
          name: files[i].name,
          size: files[i].size,
          // fileId: fileId,
          lastModified: files[i].lastModified,
          description: "",
          url: URL.createObjectURL(files[i]),
        });
      }

      // setFile([...file, ...files], "files");
      setFileNameIdBack([...fileNameIdBack, ...fileNames], "names");
      console.log(fileNameIdBack, "Names", fileIdBack);
    }
  };

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    const fileNames = [];
    console.log(files[0].name);

    let worker = InitWorkerForAccountVerification();
    var reader = new FileReader();
    reader.onload = function (event) {
      worker.postMessage({
        cmd: "process",
        image: event.target.result,
      });

      // const base64Data = btoa(event.target.result);
      // handleBase64Data(base64Data);
    };
    if (event.target.files.length) {
      reader.readAsDataURL(event.target.files[0]);
    }

    setFileIdMrz([...files]);

    console.log(files, "filesMRZ", [...files]);

    for (let i = 0; i < files.length; i++) {
      // const fileId = v4();
      fileNames.push({
        name: files[i].name,
        size: files[i].size,
        // fileId: fileId,
        lastModified: files[i]["lastModified"],
        description: "",
        url: URL.createObjectURL(files[i]),
      });
    }

    // setFile([...file, ...files], "files");
    setFileName([...fileNames], "names");
    console.log(fileNames, "FrontNames", fileIdBack);
  };

  const handleFileSelectIdBack = async (event) => {
    const files = event.target.files;
    const fileNames = [];
    console.log(files[0].name);
    await setFileIdBack([...files], "files");

    console.log(files, "SElECTEDF", fileIdBack);

    for (let i = 0; i < files.length; i++) {
      // const fileId = v4();
      fileNames.push({
        name: files[i].name,
        size: files[i].size,
        // fileId: fileId,
        lastModified: files[i]["lastModified"],
        description: "",
        url: URL.createObjectURL(files[i]),
      });
    }

    // setFile([...file, ...files], "files");
    setFileNameIdBack([...fileNames], "names");
    console.log(fileNameIdBack, "Names", fileIdBack);
  };

  // Passing the image file to the mother component (RequestExistingPlayerProfile)
  useEffect(() => {
    idCardImageWithoutMrz(fileIdBack);
  }, [fileIdBack]);
  // Passing the image file with mrz to the mother component (RequestExistingPlayerProfile)
  useEffect(() => {
    idCardImageWithMrz(fileIdMRz);
  }, [fileIdMRz]);

  //   const retrievedFirstName = sessionStorage.getItem("firstName");
  //   localStorage.setItem("lastName", parsed.lastName);
  //         localStorage.setItem("nationality", parsed.nationality);
  //         localStorage.setItem("birthDate", parsed.birthDate);
  const [firstName, setFirstName] = useState("");
  const [mrzLoader, setMrzLoader] = useState("");

  // Getting value of mrz code from mrz scanner
  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedFirstName = sessionStorage.getItem("firstName");
      setFirstName(retrievedFirstName);
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  //Getting progress status from mrz loader
  useEffect(() => {
    const intervalId = setInterval(() => {
      const retrievedMrzProgress = sessionStorage.getItem("mrzProgressLoading");
      // alert(retrievedMrzProgress);
      setMrzLoader(retrievedMrzProgress);
      // if (retrievedMrzProgress && retrievedMrzProgress.toString() === "true") {
      //   dispatch(setOpenCircularLoadBackdrop);
      // } else {
      //   dispatch(setCloseCircularLoadBackdrop);
      // }
    }, 100); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  //   useEffect(() => {
  //     // Listen for changes in the secondModalOpen state
  //     if (secondModalOpen) {
  //       setOpen(true);
  //     } else {
  //       setOpen(false);
  //     }
  //   }, [secondModalOpen]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        // onClick={handleClick}
        variant="contained"
      >
        select File
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            className="cardBackground primaryTextColor md:w-[75%] md:h-[94%] md:absolute md:top-[50%] md:left-[50%] md:flex md:flex-col
              sm:w-[100%] sm:h-[100%] sm:absolute sm:top-[50%] sm:left-[50%] sm:flex sm:flex-col
              "
            style={style}
          >
            <h2>Upload images of ID or passport </h2>
            <div
              style={{
                height: "100%",
                width: "100%",
                // background: "red",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: ".5",

                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "4vh",
                }}
              >
                <h5>Sample with mrz code</h5>
                <div
                  style={{
                    width: "22vw",
                    height: "25vh",
                    border: "1px dashed black",
                    backgroundImage:
                      fileName.length === 0
                        ? `url(${idImage})`
                        : `url(${fileName[0].url})`,
                    backgroundSize: "cover",
                  }}
                ></div>

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  accept="image/*" // Limit to video files
                  //   multiple
                />

                <Button
                  //   onClick={handleOpen}
                  // onClick={handleClick}
                  onClick={handleClick}
                  variant="contained"
                  disabled={
                    mrzLoader && mrzLoader.toString() === "true" ? true : false
                  }
                >
                  Upload
                </Button>
                {/* {mrzLoader.toString()} */}
                {mrzLoader && mrzLoader.toString() === "true" ? (
                  <CircularProgress />
                ) : (
                  ""
                )}
                <div id="mrz-data"></div>
              </div>

              {/* // Right Image */}
              <div
                style={{
                  flex: ".5",

                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "4vh",
                }}
              >
                <h5>Other side of card or last page of passport</h5>

                <div
                  style={{
                    width: "22vw",
                    height: "25vh",
                    border: "1px dashed black",
                    backgroundImage:
                      fileNameIdBack.length === 0
                        ? `url(${idImage})`
                        : `url(${fileNameIdBack[0].url})`,
                    backgroundSize: "cover",
                  }}
                  onDragOver={handleDragOverIdBack}
                  onDrop={handleDropIdBack}
                ></div>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  // multiple
                  ref={idBackfileInputRef}
                  onChange={handleFileSelectIdBack}
                  style={{ display: "none" }}
                />
                <Button
                  // onClick={handleOpen}
                  onClick={() => idBackfileInputRef.current.click()}
                  // onClick={handleClick}
                  variant="contained"
                >
                  Upload
                </Button>
              </div>
            </div>

            <Button
              onClick={handleClose}
              // onClick={handleClick}
              variant="contained"
            >
              Done
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
