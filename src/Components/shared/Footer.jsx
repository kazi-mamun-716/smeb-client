import Smeb from "../../assets/images/smeb.png";
const Footer = () => {
  return (
    <footer className={`footer justify-center lg:justify-between bg-[url('/footer-bg.png')] bg-cover rounded p-10 items-center lg:mb-2`}>
  <aside className="flex flex-col lg:flex-row items-center">
    <img src={Smeb} width={60} className="rounded" alt="SMEB" />
    <div>
    <h3 className="text-md font-semibold">
      Society of Marine Engineers Bangladesh      
    </h3>
    <h3 className="text-md font-semibold">সোসাইটি অব মেরিন ইন্জিনিয়ার্স, বাংলাদেশ।</h3>
    </div>
  </aside>
  <nav className="flex lg:flex-col">
    <h6 className="footer-title">Stay Connected</h6>
    <div className="flex gap-4">      
      <a href="https://www.youtube.com/@smebcentral" target="_blank" rel="noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a href="https://www.facebook.com/smebcentral" target="_blank" rel="noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
      <a href="https://www.linkedin.com/in/smeb/" target="_blank" rel="noreferrer">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1"  
          width="24" 
          height="24" 
          viewBox="0 0 24 24"
          className="fill-current">
          <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
        </svg>
      </a>
    </div>
  </nav>
  <p>Copyright &#169; {new Date().getFullYear()} - All rights reserved</p>
</footer>
  );
};

export default Footer;
