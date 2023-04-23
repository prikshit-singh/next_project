import  Head  from 'next/head';
import Layout from '@/layouts/mainLayout'
export default  function Contact() {
    return (

        <div>
            <Head>
                <title>My page title</title>
            </Head>
            <p>Hello world!</p>
        </div>

    );
}

Contact.Layout=Layout

//  index;