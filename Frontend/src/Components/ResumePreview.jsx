import React from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = '' }) => {

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accentColor} />
      case 'minimal-image':
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className="w-full bg-gray-100 p-6 overflow-auto">

      {/* Resume Paper */}
      <div
        id="resume-preview"
        className={`bg-white mx-auto shadow-lg border border-gray-200 
                    w-[850px] min-h-[1100px] print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}
      </div>

      {/* Print CSS */}
      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview, #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
            }
          }
        `}
      </style>

    </div>
  )
}

export default ResumePreview