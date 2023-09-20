import { svgData } from "../../../components/crafted-icons/NioIconData";
const supportGeneralIcon = svgData.filter((icon) => icon.slug === "support-general")[0]
const supportSecureIcon = svgData.filter((icon) => icon.slug === "support-secure")[0]
const supportPaymentIcon = svgData.filter((icon) => icon.slug === "support-payment")[0]
const supportAccountIcon = svgData.filter((icon) => icon.slug === "support-account")[0]

export const supportTopics = [
    {
        id: 'st01',
        title: "General",
        slug: "general-topics",
        icon: supportGeneralIcon.svg,
        desc: "You can find all of the questions and answers of general purpose.",
    },
    {
        id: 'st02',
        title: "Account Security",
        slug: "account-security-topics",
        icon: supportSecureIcon.svg,
        desc: "You can find all of the questions and answers about secure your account.",
    },
    {
        id: 'st03',
        title: "Payment Related",
        slug: "payment-related-topics",
        icon: supportPaymentIcon.svg,
        desc: "You can find all of the questions and answers about online payment.",
    },
    {
        id: 'st04',
        title: "Terms & Policy",
        slug: "terms-policy-topics",
        icon: supportAccountIcon.svg,
        desc: "You can find all of the questions and answers about Privacy Policy.",
    },
]

export const supportQuestions = [
    {
        id:"qid1",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"shield-check",
        iconTheme:"bg-gray",
        title:"How to add Two-factor authentication?",
        excerpt: "You can add 2-Step verification from your account. Goto account setting and",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid2",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"security",
        iconTheme:"bg-purple",
        title:"Is my information secure?",
        excerpt: "Homely make your information private and no one can access your personal...",
        updated: "Updated 8 months ago",
    },
    {
        id:"qid3",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"cc-secure",
        iconTheme:"bg-warning",
        title:"Is my credit card and checking account information safe?",
        excerpt: "Absolutely. Invoice Cloud will safely store all of your financial information using Payment",
        updated: "Updated 8 months ago",
    },
    {
        id:"qid4",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"shield-star",
        iconTheme:"bg-success",
        title:"how can make my account more secure?",
        excerpt: "If you want to make your account more secure you need to add more verification system that.",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid5",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"shield-check",
        iconTheme:"bg-primary",
        title:"What is “2-step authentication” and why is it so important?",
        excerpt: "2-Step verification is a verification process that you need to verify by phone and",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid6",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Who has access to my account?",
        excerpt: "You and the Homely are authorized staff. No one will have access to your",
        updated: "Updated 1 month ago",
    },
    {
        id:"qid7",
        topic:"st02",
        topicTitle:"Account Security",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Dark Theme/Dark Mode now available",
        excerpt: "We're thrilled to share that dark mode is now available",
        updated: "Updated 1 month ago",
    },
    {
        id:"qid8",
        topic:"st01",
        topicTitle:"General",
        icon:"info",
        iconTheme:"bg-gray",
        title:"What is a subscription panel?",
        excerpt: "A subscription panel is a service that allows individuals or businesses to subscribe",
        updated: "Updated 2 month ago",
    },
    {
        id:"qid9",
        topic:"st01",
        topicTitle:"General",
        icon:"shield-star",
        iconTheme:"bg-success",
        title:"How does a subscription panel work?",
        excerpt: "A subscription panel typically operates by collecting user information and preferences",
        updated: "Updated 1 days ago",
    },
    {
        id:"qid10",
        topic:"st01",
        topicTitle:"General",
        icon:"cc-secure",
        iconTheme:"bg-warning",
        title:"What are the benefits of joining a subscription panel?",
        excerpt: "Some benefits of joining a subscription panel include receiving valuable information or content directly to your inbox,",
        updated: "Updated 3 years ago",
    },
    {
        id:"qid11",
        topic:"st01",
        topicTitle:"General",
        icon:"shield-check",
        iconTheme:"bg-primary",
        title:"Can I customize my subscription preferences?",
        excerpt: "Many subscription panels allow you to customize your preferences based on your interests.",
        updated: "Updated 2 months ago",
    },
    {
        id:"qid12",
        topic:"st01",
        topicTitle:"General",
        icon:"security",
        iconTheme:"bg-purple",
        title:"How often will I receive updates from a subscription panel?",
        excerpt: "The frequency of updates varies depending on the panel. Some panels may send daily updates, while others might send weekly or monthly newsletters",
        updated: "Updated 1 months ago",
    },
    {
        id:"qid13",
        topic:"st01",
        topicTitle:"General",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Can I share my subscription panel access with others?",
        excerpt: "Sharing access to a subscription panel depends on the panel's terms and conditions.",
        updated: "Updated 8 days ago",
    },
    {
        id:"qid14",
        topic:"st03",
        topicTitle:"Payment Related",
        icon:"shield-star",
        iconTheme:"bg-success",
        title:"What payment methods do you accept?",
        excerpt: "We accept various payment methods, including credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and sometimes alternative methods like Apple Pay or Google Pay.",
        updated: "Updated 1 days ago",
    },
    {
        id:"qid15",
        topic:"st03",
        topicTitle:"Payment Related",
        icon:"cc-secure",
        iconTheme:"bg-warning",
        title:" Is my payment information secure?",
        excerpt: "Yes, we take the security of your payment information seriously. We employ encryption technology and adhere to industry best practices",
        updated: "Updated 3 years ago",
    },
    {
        id:"qid16",
        topic:"st03",
        topicTitle:"Payment Related",
        icon:"shield-check",
        iconTheme:"bg-primary",
        title:"Can I get a refund for my purchase?",
        excerpt: "Our refund policy may vary depending on the product or service you have purchased. ",
        updated: "Updated 2 months ago",
    },
    {
        id:"qid17",
        topic:"st03",
        topicTitle:"Payment Related",
        icon:"security",
        iconTheme:"bg-purple",
        title:"How long does it take for a refund to be processed?",
        excerpt: "The time it takes to process a refund depends on the payment method and the policies of your financial institution.",
        updated: "Updated 1 months ago",
    },
    {
        id:"qid18",
        topic:"st03",
        topicTitle:"Payment Related",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Are there any hidden fees associated with my payment?",
        excerpt: "We strive to provide transparency in our pricing and fees. Any applicable fees, such as transaction or processing fees,",
        updated: "Updated 8 days ago",
    },
    {
        id:"qid19",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"shield-check",
        iconTheme:"bg-gray",
        title:"Where can I find your terms and policies?",
        excerpt: "You can usually find our terms and policies on our website. Look for links such as 'Terms and Conditions' or 'Privacy Policy' in the footer or navigation menu",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid20",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"security",
        iconTheme:"bg-purple",
        title:"What is covered in your terms and conditions?",
        excerpt: "Our terms and conditions typically outline the rules and regulations governing the use of our website, products, or services. ",
        updated: "Updated 8 months ago",
    },
    {
        id:"qid21",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"cc-secure",
        iconTheme:"bg-warning",
        title:"What is your privacy policy?",
        excerpt: "Our privacy policy details how we collect, use, store, and protect your personal information.",
        updated: "Updated 8 months ago",
    },
    {
        id:"qid22",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"shield-star",
        iconTheme:"bg-success",
        title:"How do you protect my personal information?",
        excerpt: "We take appropriate measures to safeguard your personal information. This includes using encryption, secure servers, access controls, and following industry best practices to protect your data from unauthorized access, loss, or misuse",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid23",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"shield-check",
        iconTheme:"bg-primary",
        title:"What happens if I violate the terms and conditions?",
        excerpt: "Violating the terms and conditions may result in various consequences, depending on the severity of the violation. ",
        updated: "Updated 1 year ago",
    },
    {
        id:"qid24",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Can your terms and policies change?",
        excerpt: "Yes, our terms and policies may change from time to time. We reserve the right to update or modify them as necessary.",
        updated: "Updated 1 month ago",
    },
    {
        id:"qid25",
        topic:"st04",
        topicTitle:"Terms & Policy",
        icon:"info",
        iconTheme:"bg-gray",
        title:"Are there age restrictions for using your services?",
        excerpt: "Our services may have age restrictions. Generally, individuals under a certain age (often 13 or 18, depending on the jurisdiction) may require parental consent.",
        updated: "Updated 1 month ago",
    },
]