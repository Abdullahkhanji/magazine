import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

type Props = {};

const AddVolume = (props: Props) => {
  function addFn() {
    let divEle = document.getElementById("inputFields");
    if (divEle) {
      divEle.innerHTML += `
      <div>
        <input type="text" placeholder="Enter value" class="input-field">
        <input type="text" placeholder="Enter value" class="input-field">
      </div>
      `;
    }
  }
  return (
    <>
      <Navbar />
      <div>
        <div className="Header">
          <h1>اضافة مجلة</h1>
        </div>
        <div className="AltHeader">
          <h2>اضافة مجلة</h2>
        </div>
        <div className="VolumeInfo">
          <label htmlFor="">عدد المجلة</label>
          <input type="text" />

          <label htmlFor="">غلاف المجلة</label>
          <input className="AddImage" type="file" />
        </div>
        <div className="Research">
          <button className="add-button" onClick={addFn}>
            Add Input Fields
          </button>
          <div className="InputFields" id="inputFields">
            <div className="PartInfo">
              <div>
                <label htmlFor="">عنوان البحث</label>
                <input
                  type="text"
                  placeholder="Part Name"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="">اسم الناشر</label>
                <input
                  type="text"
                  placeholder="Publisher Name"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="">عمل الناشر</label>
                <input
                  type="text"
                  placeholder="Publisher job"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="">بريد الناشر</label>
                <input
                  type="text"
                  placeholder="Publisher email"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="">ملخص البحث</label>
                <input
                  type="text"
                  placeholder="Descreption"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor=""></label>
                <input className="AddImage" type="file" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddVolume;
