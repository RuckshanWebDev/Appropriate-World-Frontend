import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Box, Button, Card, Flex, Grid, Text, TextArea, TextFieldInput, Theme } from '@radix-ui/themes'
import * as Accordion from '@radix-ui/react-accordion';
import './Faq.css'
import { useCreateFeedbackMutation } from '../features/feedbackApi';
import { toast } from 'react-toastify';



function Faq() {

    const [feedbackFn, feedbackData] = useCreateFeedbackMutation()


    const [faqs, setFaqs] = useState([
        {
            open: true,
            question: '1. How can I report abuse or inappropriate content on our platform?',
            answer: 'To report abuse or inappropriate content, please email us at info@justcreate.tv with details and screenshots if possible. We take such matters seriously and will investigate promptly.'
        },
        {
            open: false,
            question: '2. I am experiencing bug issues on our platform. Who can I contact?',
            answer: `For bug issues or technical support, please email our support team at info@justcreate.tv. Provide details about the problem you're experiencing, and we'll assist you as soon as possible.`
        },
        {
            open: false,
            question: '3. What happens if I forget my password?',
            answer: 'If you forget your password, you can reset it by clicking on the "Forgot Password" link on the login page. Follow the instructions provided, and if you need further assistance, contact us at info@justcreate.tv.'
        },
        {
            open: false,
            question: '4. What happens if I want to make suggestions to improve Just Create platform?',
            answer: 'We welcome your suggestions! Please email us at info@justcreate.tv with your ideas and feedback. Your input helps us enhance the platform for all users.'
        },
    ]);

    const toggleFAQ = index => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false;
                }

                return faq;
            })
        );
    };

    const formHandler = async (e) => {

        let popup = toast.loading("Submiting, Please wait!")
        e.preventDefault()

        try {
            await feedbackFn({ email: e.target.email.value, mention: e.target.reason.value, feedback: e.target.feedback.value }).unwrap()
            toast.dismiss()
            toast.success("Successfully Created")
            e.target.email.value = ''
            e.target.reason.value = ''
            e.target.feedback.value = ''
        } catch (error) {
            toast.dismiss()
            toast.error("Something went wrong try again later!")
        }
    }

    return (
        <Layout>
            <div className="container " style={{ paddingBottom: '80px' }}>
                <div className="profile-page-container">
                    <div className="" style={{ width: '100%', margin: '0 auto', maxWidth: '768px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                            <h2 style={{ textAlign: 'center', }} >FAQs</h2>
                            <div className="faqs">
                                {faqs.map((faq, index) => (
                                    <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
                            <h2 style={{ textAlign: 'center', }} >Guidelines</h2>
                            <ol>
                                <li style={{ color: '#fff', marginBottom: 15, lineHeight: 1.5 }} >Respect Others: Treat fellow community members with kindness and respect. Avoid harassment, hate speech, and any form of discrimination.</li>
                                <li style={{ color: '#fff', marginBottom: 15, lineHeight: 1.5 }} >Content Guidelines: Share content that is original, appropriate, and adheres to copyright laws. Avoid posting explicit or offensive material.</li>
                                <li style={{ color: '#fff', marginBottom: 15, lineHeight: 1.5 }} >Constructive Feedback: Provide feedback and suggestions in a constructive manner. Help us improve the platform for everyone's benefit.</li>
                                <li style={{ color: '#fff', marginBottom: 15, lineHeight: 1.5 }} >Safety First: Protect your personal information and report any suspicious activity or behavior to our support team.</li>
                                <li style={{ color: '#fff', marginBottom: 15, lineHeight: 1.5 }} >Have Fun: Enjoy exploring and creating on Just Create! Let your creativity thrive while being mindful of others in the community.</li>
                            </ol>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '80px' }} >
                            <h2 style={{ textAlign: 'center', }} >Report</h2>
                            <span style={{ textAlign: 'center', width: '100%' }}>You will contact shortly</span>

                            <Theme style={{ width: '100%', marginTop: '30px' }}>
                                <Box maxWidth="768px" width={'100%'}>
                                    <form onSubmit={formHandler}>
                                        <Card size="2">
                                            <Flex direction="column" gap="3">
                                                <Grid gap="1">
                                                    <Text as="div" weight="bold" size="2" mb="1">
                                                        Email
                                                    </Text>
                                                    <TextFieldInput name='email' placeholder="Email..." type='email' required />
                                                </Grid>
                                                <Grid gap="1">
                                                    <Text as="div" weight="bold" size="2" mb="1" >
                                                        Reason
                                                    </Text>
                                                    <TextFieldInput name='reason' placeholder="You can specify a post, person or an issue here...." type='text' required />
                                                </Grid>
                                                <Grid gap="1">
                                                    <Text as="div" weight="bold" size="2" mb="1">
                                                        Feedback
                                                    </Text>
                                                    <TextArea name='feedback' placeholder="Write your feedback…" rows={10} />
                                                </Grid>
                                                <Grid columns="2" gap="2">
                                                    <Button style={{ marginLeft: 'auto', gridColumnStart: 2 }} type='submit' disabled={feedbackData.isLoading} >Submit</Button>
                                                </Grid>
                                            </Flex>
                                        </Card>
                                    </form>
                                </Box>
                            </Theme>

                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    )
}

const FAQ = ({ faq, index, toggleFAQ }) => {
    return (
        <div
            className={"faq " + (faq.open ? "open" : "")}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
        </div>
    );
};


export default Faq
