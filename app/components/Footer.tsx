const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#21616A] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-200 text-sm">
          © {currentYear} StudyBeee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
