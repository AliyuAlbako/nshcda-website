import RegisterHero from "../components/opportunities/RegisterHero";
import RegisterSidebar from "../components/opportunities/RegisterSidebar";
import EmploymentProfileForm from "../components/opportunities/EmploymentProfileForm";
import { useRef } from "react";


function RegisterEmploymentProfile() {
     const registrationRef = useRef(null);

    return (

        <>

            <RegisterHero />

            <section
    ref={registrationRef}
    className="employment-registration"
>

                <div className="container registration-layout">

                    <RegisterSidebar />

                    <EmploymentProfileForm   registrationRef={registrationRef}/>

                </div>

            </section>

        </>

    );

}

export default RegisterEmploymentProfile;