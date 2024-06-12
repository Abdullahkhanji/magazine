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
      <div className="List">
        <ol>
          <li>استلام البحث العلمي المرسل الى المجلة.</li>
          <li>الفحص الأولي لتنسيقات البحث ومطابقة شروط النشر في المجلة.</li>
          <li>
            إخطار الباحث بنتيجة الفحص الأولي للبحث من قبل هيئة تحرير المجلة.
          </li>
          <li>إرسال البحث الى المحكمين للتحكيم النهائي.</li>
          <li>إخطار الباحث عبر الإيميل بنتيجة التحكيم النهائي.</li>
          <li>مطالبة الباحث بالتعديل وفق آراء المحكمين إن وجدت.</li>
          <li>إرسال وثيقة للباحث بقبول بحثه للنشر.</li>
          <li>نشر البحث في الإصدار القادم من المجلة.</li>
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default PublicationSteps;
