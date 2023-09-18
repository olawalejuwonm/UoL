import React from "react";




export const InLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0 + "px",
        top: 0 + "px",
        width: 100 + "%",
        height: 100 + "%",
        zIndex: 9999,
        background:
          'url("//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif")' +
          "50% 50% no-repeat rgb(249, 249, 249)",
      }}
    />
  );
};

export const FlatList = ({
  items,
  RenderItem,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
}) => {
  // console.log(Render)

  // console.log(items, "items");

  if (Array.isArray(items)) {
    const render = items.map((v, i) => {
      return RenderItem({ item: v, key: i });
    });

    // console.log(render, "render");

    if (render.length) {
      return (
        <React.Fragment>
          {ListHeaderComponent ? ListHeaderComponent() : null}
          {render}
          {ListFooterComponent ? ListFooterComponent() : null}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {/* {ListHeaderComponent ? ListHeaderComponent() : null} */}
        {ListEmptyComponent ? ListEmptyComponent() : null}
        {/* {ListFooterComponent ? ListFooterComponent() : null} */}
      </React.Fragment>
    );
  }

  if (ListHeaderComponent || ListEmptyComponent || ListEmptyComponent) {
    return (
      <React.Fragment>
        {ListHeaderComponent ? ListHeaderComponent() : null}

        {ListEmptyComponent ? ListEmptyComponent() : null}
        {ListFooterComponent ? ListFooterComponent() : null}
      </React.Fragment>
    );
  }
  return null;
};






export const serialize = function (obj) {
  var str = [];

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }

  return str.join("&");
};

export const deSerialize = (search) => {
  return JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );
};

export const matchFunc = (m) => {
  if (m) {
    return deSerialize(m);
  } else {
    return false;
  }
};

export const styleform = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: "90%", xs: "90%", md: "60%" },
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 30,
  p: 4,
};

export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return "";
}

export const convertDate = (date, addition) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  //determine if it's NaN
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return null;
  }

  let monthName = "";

  //format month to month name
  monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    newDate
  );

  if (addition) {
    if (addition.type) {
      monthName = new Intl.DateTimeFormat("en-US", {
        month: addition.type,
      }).format(newDate);
    }
    if (addition.year) {
      return `${monthName} ${day}, ${year}`;
    }
  }

  return `${monthName} ${day}`;
};

export const verifyPath = "/verify";

export const toNumber = (value) => {
  if (isNaN(Number(value))) {
    return false;
  }
  return Number(value);
};

export function PrintElem(elem) {
  // console.log(elem, "elem");
  var mywindow = window.open("", "PRINT", "height=400,width=600");
  function getCSS(element) {
    var css_data = "";
    var css_obj = getComputedStyle(element);

    for (var i = 0; i < css_obj.length; i++) {
      css_data +=
        css_obj[i] + ":" + css_obj.getPropertyValue(css_obj[i]) + ";<br>";
    }
    // document.getElementById("resDiv").innerHTML = css_data;
    console.log(css_data, "css_data");
    return css_data;
  }
  elem.setAttribute("style", getCSS(document.getElementById("root")));
  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write("</head><body >");
  // mywindow.document.write("<h1>" + document.title + "</h1>");
  mywindow.document.write(elem.innerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}

export const handleForm = (e) => {
  const elem = e?.target?.elements;
  if (!elem) {
    return;
  }
  const formData = new FormData();
  let alldata = {};
  try {
    //get all input elements
    const inputElements = e.target.getElementsByTagName("input");
    //add the values from the input elements to the alldata object
    for (let i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type === "checkbox") {
        if (inputElements[i].checked) {
          const value = inputElements[i].value;
          if (value === "on") {
            //Convert "on" to true
            alldata[inputElements[i].name] = true;
          } else {
            alldata[inputElements[i].name] = value;
          }
        } else {
          alldata[inputElements[i].name] = false;
        }
      } else {
        alldata[inputElements[i].name] = inputElements[i].value;
      }
    }
    //get all select elements
    const selectElements = e.target.getElementsByTagName("select");
    //add the values from the select elements to the alldata object
    for (let i = 0; i < selectElements.length; i++) {
      alldata[selectElements[i].name] = selectElements[i].value;
    }
  } catch (e) {
    console.warn(e, "No input elements found");
  }
  console.log(elem, "elem", e);
  function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    //ERROR HERE iLEn
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
  //return an array of multiple select values
  const Tlength = elem?.length || 0;
  for (let i = 0; i < Tlength; i++) {
    // console.log(elem[i].type);
    if (elem[i].type === "file") {
      if (elem[i].files.length > 0) {
        formData.append(elem[i].name, elem[i].files[0]);
      }
    } else if (elem[i].type === "select-multiple") {
      // console.log("elem[i].name", elem[i].name, elem[i], getSelectValues(elem[i]));
      // formData.append(elem[i].name, getSelectValues(elem[i]));
      alldata[elem[i].name] = getSelectValues(elem[i]);
    } else if (elem[i].type === "radio") {
      if (elem[i].checked) {
        formData.append(elem[i].name, elem[i].value);
      }
    } else if (elem[i].type !== "checkbox") {
      if (elem[i].value) {
        formData.append(elem[i].name, elem[i].value);
      }
    }
  }

  for (var key of formData.entries()) {
    alldata[key[0]] = key[1];
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0], ":", key[1]);
  // }

  console.log(alldata, "      AllData beginssss checkbox    ");

  const checkBoxData = {};
  for (let i = 0; i < Tlength; i++) {
    if (elem[i].type === "checkbox") {
      console.log(elem[i].name, elem[i].checked);
      // formData.append(elem[i].name, elem[i].value);
      if (elem[i].checked) {
        if (checkBoxData[elem[i].name]) {
          checkBoxData[elem[i].name].push(elem[i].value);
        } else {
          checkBoxData[elem[i].name] = [elem[i].value];
        }
      }
    }
  }

  console.log(checkBoxData, "checkBoxData");

  // iterate through checkBoxData and append to formData
  // for (let key in checkBoxData) {
  //   console.log(key, checkBoxData[key], "checkBoxData");
  //   formData.append(key, JSON.stringify(checkBoxData[key]));
  // }

  //delete empty string values from formData
  for (let key of formData.entries()) {
    // console.log(key, "key");
    if (key[1] === "") {
      formData.delete(key[0]);
    }
    //remove those with empty keys
    if (key[0] === "") {
      formData.delete(key[0]);
    }
  }

  // console.log(formData.entries(), "formData");
  for (var mkey of formData.entries()) {
    alldata[mkey[0]] = mkey[1];
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0], ":", key[1]);
  // }

  // console.log(alldata, "      AllData --       ");
  return alldata;
};


export const searchData = (searchTerm, searchBy, data) => {
  let result = [];
  if (searchTerm === "") {
    return data;
  }
  if (Array.isArray(searchBy)) {
    for (let i = 0; i < searchBy.length; i++) {
      result = result.concat(
        data.filter((item) =>
          item[searchBy[i]].toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  } else {
    result = data.filter((item) =>
      item[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return result;
};
