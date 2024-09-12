import { NavbarPage } from './navbar'
import { Carousel } from './Carousel'
import { PlansPage } from './PlansPage'
import { AboutUs } from './AboutUs'
import { TeamSection } from './TeamSection'
import { ContactUs } from './ContactUs'
import { Footer } from './Footer'
import { ScrollToTopButton } from './ScrollToTopButton'; 


export const HomeBlog = () => {
    return (
        <>
        <NavbarPage/>
        <Carousel/>
        <PlansPage/>
        <AboutUs/>       
        <TeamSection/>
        <ContactUs/>
        <Footer/>
        <ScrollToTopButton />
        </>
    )
}