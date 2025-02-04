import Layout from '../Layout'
import { FC } from 'react'
import { Faq } from '../../interfaces'

const PageHeader: FC = () => (
  <>
    <h1 className="text-body-emphasis">{"F.A.Q's"}</h1>
    <p>Frequently Asked Questions</p>
    <p className="lead">
      In case you have any questions not answered in the FAQs, feel free to <a href="mailto:mail@example.com">contact us</a>.
    </p>
  </>
)

const PageContent: FC<{ faqs: Faq[] }> = ({ faqs }) => (
  <div className="accordion" id="accordion">
    {faqs.map((faq: Faq, index) => (
      <div className="accordion-item" key={index}>
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${index}`}
            aria-expanded="false"
            aria-controls={`collapse${index}`}
          >
            {faq.question}
          </button>
        </h2>
        <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordion">
          {faq.hasFormatting ? (
            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          ) : (
            <div className="accordion-body">{faq.answer}</div>
          )}
        </div>
      </div>
    ))}
  </div>
)

export const FaqPage = ({ faqs }: { faqs: Faq[] }) => (
  <Layout>
    <main className="container-fluid bg-body-tertiary ">
      <div className="col-12 col-lg-8 col-xxl-6 mx-auto p-4 py-md-5">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <PageHeader />
            </div>
            <div className="row">
              <PageContent faqs={faqs} />
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
)
