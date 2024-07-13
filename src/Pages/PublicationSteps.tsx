import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

type Props = {};

const PublicationSteps = (props: Props) => {
  return (
    <>
      <Navbar />
      <div className="Header">
        <h1>خطوات النشر</h1>
      </div>
      <div className="AltHeader">
        <h2>خطوات النشر</h2>
      </div>
      <div className="List ">
        <ol>
          <li>1. استلام البحث العلمي المرسل الى المجلة.</li>
          <li>2. الفحص الأولي لتنسيقات البحث ومطابقة شروط النشر في المجلة.</li>
          <li>
            3. إخطار الباحث بنتيجة الفحص الأولي للبحث من قبل هيئة تحرير المجلة.
          </li>
          <li>4. إرسال البحث الى المحكمين للتحكيم النهائي.</li>
          <li>5. إخطار الباحث عبر الإيميل بنتيجة التحكيم النهائي.</li>
          <li>6. مطالبة الباحث بالتعديل وفق آراء المحكمين إن وجدت.</li>
          <li>7. إرسال وثيقة للباحث بقبول بحثه للنشر.</li>
          <li>8. نشر البحث في الإصدار القادم من المجلة.</li>
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default PublicationSteps;
