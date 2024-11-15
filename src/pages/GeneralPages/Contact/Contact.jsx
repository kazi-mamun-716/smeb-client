import SMEB from '../../../assets/images/smeb.jpeg';
const Contact = () => {
  return (
    <div className="flex justify-center items-center">      
      <div>
        <img src={SMEB} alt="" />
      </div>
      <div>
      <h2 className='text-xl font-bold'>Society of Marine Engineers Bangladesh</h2>
      <p>Hemantika, House no 25A, Road 16,Flat A6,</p>
      <p>Sector 4, Uttara, Dhaka 1230, Bangladesh.</p>
      <p>Cell & WhatsApp +8801715014953</p>
      <p>Email: smeb.central@gmail.com</p>
      </div>
    </div>
  );
};

export default Contact;
