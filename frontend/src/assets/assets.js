import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import arrow_icon from './arrow_icon.svg'
import logo from './logo.svg'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import header_img from './header_img.png'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Dermatologist from './Dermatologist.svg'
import Pediatricians from './Pediatricians.svg'
import Neurologist from './Neurologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import appointment_img from './appointment_img.png'
import verified_icon from './verified_icon.svg'
import info_icon from './info_icon.svg'
import doc16 from './Doc16.jpeg'
import about_img from './about_image.png'
import contact_img from './contact_image.png'
import salam_img from './salam.jpg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
export const assets = {
    add_icon,
    admin_logo,
    salam_img,
    menu_icon,
    cross_icon,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    arrow_icon,
    logo,
    profile_pic,
    dropdown_icon,
    group_profiles,
    header_img,
    General_physician,
    Gynecologist,
    Dermatologist,
    Pediatricians,
    Neurologist,
    Gastroenterologist,
    contact_img,
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    doc11,
    doc12,
    doc13,
    doc14,
    doc15,
    doc16,
    appointment_img,
    verified_icon,
    info_icon,
    about_img
}

export const specialityData = [
    {
        speciality: 'General_physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]


export const doctors = [
    
    {
    
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Looking for expert skin care? Our certified dermatologists specialize in acne treatment, eczema management, psoriasis care, hair loss solutions, and advanced cosmetic procedures. Book an appointment today for professional dermatology consultation and personalized skin care solutions',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc2',
        name: 'Dr.Emily Larson',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Our Gynecology department provides comprehensive women’s healthcare services including menstrual disorder treatment, pregnancy monitoring, infertility management, and preventive screening for reproductive health conditions. We ensure personalized and compassionate care for women at every stage of life.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc3',
        name: 'Dr.Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Looking for expert skin care? Our certified dermatologists specialize in acne treatment, eczema management, psoriasis care, hair loss solutions, and advanced cosmetic procedures. Book an appointment today for professional dermatology consultation and personalized skin care solutions.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc4',
        name: 'Dr.Cristopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc5',
        name: 'Dr.Gennifer Garcia',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc6',
        name: 'Dr.Andrew Williams',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 40,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc7',
        name: 'Dr.Cristopher Davis',
        image: doc7,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc8',
        name: 'Dr.Timothy White',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Our Gynecology department provides comprehensive women’s healthcare services including menstrual disorder treatment, pregnancy monitoring, infertility management, and preventive screening for reproductive health conditions. We ensure personalized and compassionate care for women at every stage of life.',
        fees: 45,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc9',
        name: 'Dr.Ava Mitchell',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Looking for expert skin care? Our certified dermatologists specialize in acne treatment, eczema management, psoriasis care, hair loss solutions, and advanced cosmetic procedures. Book an appointment today for professional dermatology consultation and personalized skin care solutions.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc10',
        name: 'Dr.Jeffrey King',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 60,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc11',
        name: 'Dr.Sadia Jaman',
        image: doc11,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '4 years',
        about:'Dr. Davis is dedicated to providing comprehensive medical care.He prioritizes patient well-being and personalized treatment.His approach combines expertise with compassionate attention.Every patient receives thorough and thoughtful care under his guidance.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc12',
        name: 'Dr.Abdus Salam',
        image: doc12,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis is a dedicated dermatologist focused on skin health.He provides comprehensive care for all dermatological conditions.His approach combines expertise with personalized attention.Every patient receives thorough and compassionate skin care.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc13',
        name: 'Dr.Masuma khatun',
        image: doc13,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis is a dedicated neurologist committed to brain and nervous system health.He provides comprehensive care for a wide range of neurological conditions.His approach combines deep medical expertise with personalized attention.Patients benefit from thorough evaluations and carefully tailored treatments.Dr. Davis ensures compassionate and attentive care for every patient he sees.',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc14',
        name: 'Dr.Masud Rana',
        image: doc14,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr.Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc15',
        name: 'Dr.Sarmin Sultana',
        image: doc15,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr.Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
    },
    {
    
        _id: 'doc16',
        name: 'Dr.Rumon',
        image: doc16,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care,for',
        fees: 50,
        address: {
            line1: '17th Cross,Richard',
            line2:'Circle,Ring Road,London'
        
        }
},
    
]
