export default function InitWorker() {
  var blob = new Blob(
    [window.mrz_worker.toString().replace(/^function .+\{?|\}$/g, "")],
    { type: "text/javascript" }
  );

  var objectURL = URL.createObjectURL(blob);
  var worker = new Worker(objectURL);

  worker.addEventListener("message", async function (e) {
    var data = e.data;
    console.log(e.data, "dataas");

    if (data.type == "result") {
      // if(data.result.error)
      // Turn off loader
      sessionStorage.setItem("mrzProgressLoading", false);

      if (data.result.parsed?.valid) {
        let parsed = data.result.parsed.fields;

        // dispatch(setMrzScanner(parsed));
        let html = ``;
        await Object.keys(parsed).map((field) => {
          html += `<div>
                ${field} : ${parsed[field]}
          </div>`;
        });

        console.log(parsed, "parsedData");
        // localStorage.setItem("firstName", parsed.firstName);
        // localStorage.setItem("lastName", parsed.lastName);
        // localStorage.setItem("nationality", parsed.nationality);
        // localStorage.setItem("birthDate", parsed.birthDate);

        sessionStorage.setItem("firstName", formatString(parsed.firstName));
        sessionStorage.setItem("lastName", formatString(parsed.lastName));
        sessionStorage.setItem("nationality", parsed.nationality);
        sessionStorage.setItem("birthDate", parsed.birthDate);

        // data = parsed;
        // await Object.keys(parsed).map((field) => {
        //     console.log(`${field} : ${parsed[field]}`);
        //   });
        console.log(html);
        // let mrz_data_element = document.getElementById("mrz-data");
        // mrz_data_element.innerHTML = html;
      } else if (
        data.result.parsed?.valid === undefined ||
        data.result.parsed?.valid === false
      ) {
        sessionStorage.setItem("firstName", "");
        sessionStorage.setItem("lastName", "");
        sessionStorage.setItem("nationality", "");
        sessionStorage.setItem("birthDate", "");
        alert("Invalid image");
      }
    } else if (data.type == "progress") {
      console.log("progress");

      if (
        data.msg === "detecting" ||
        data.msg === "ocrizing" ||
        data.msg === "parsing"
      ) {
        sessionStorage.setItem("mrzProgressLoading", true);
      }

      // sessionStorage.setItem("mrzProgress", "");
    } else if (data.type == "error") {
      console.log(data.error);

      sessionStorage.setItem("firstName", "");
      sessionStorage.setItem("lastName", "");
      sessionStorage.setItem("nationality", "");
      sessionStorage.setItem("birthDate", "");

      // Error: no roi found
      // TypeError: Cannot read properties of undefined (reading 'length')
      // Error: unrecognized document format. First line of input must have 30 (TD1), 36 (TD2 or French National Id), 44 (TD3) or 9 (Swiss Driving License) characters
    }
  });

  return worker;
}

function formatString(inputString) {
  // Capitalize the first letter of each word
  let formattedString = inputString
    .toLowerCase()
    .replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  // Remove extra whitespaces
  formattedString = formattedString.replace(/\s+/g, " ").trim();
  return formattedString;
}
