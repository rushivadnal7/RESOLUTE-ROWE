import styled from "styled-components";

export const ContactWrapper = styled.section`
  position: relative;
  color: #4a5568; /* text-gray-600 */
  margin-top: 5.5rem;


  .map-background {
    position: absolute;
    inset: 0;
    background-color: #e2e8f0; /* bg-gray-300 */
  }

  .feedback-form {
    background-color: #ffffff; /* bg-white */
    border-radius: 0.5rem; /* rounded-lg */
    padding: 2rem; /* p-8 */
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem; /* mt-10 */
    width: 100%;
    max-width: 100%; /* w-full */
    position: relative;
    z-index: 10; /* relative z-10 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  }

  .form-title {
    color: #1a202c; /* text-gray-900 */
    font-size: 1.125rem; /* text-lg */
    margin-bottom: 0.25rem; /* mb-1 */
    font-weight: 500; /* font-medium */
  }

  .form-description {
    margin-bottom: 1.25rem; /* mb-5 */
    color: #4a5568; /* text-gray-600 */
  }

  .input-group {
    margin-bottom: 1rem; /* mb-4 */
  }

  .input-label {
    display: block;
    font-size: 0.875rem; /* text-sm */
    color: #4a5568; /* text-gray-600 */
  }

  .input-field {
    width: 100%;
    background-color: #ffffff; /* bg-white */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.25rem; /* rounded */
    padding: 0.5rem 0.75rem; /* py-1 px-3 */
    font-size: 1rem; /* text-base */
    color: #4a5568; /* text-gray-700 */
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* transition-colors duration-200 ease-in-out */
  }

  .input-field:focus {
    border-color: #4f46e5; /* focus:border-indigo-500 */
    outline: none;
    ring: 2px solid #c7d2fe; /* focus:ring-2 focus:ring-indigo-200 */
  }

  .input-textarea {
    width: 100%;
    background-color: #ffffff; /* bg-white */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.25rem; /* rounded */
    height: 8rem; /* h-32 */
    font-size: 1rem; /* text-base */
    color: #4a5568; /* text-gray-700 */
    padding: 0.5rem 0.75rem; /* py-1 px-3 */
    resize: none; /* no resize */
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* transition-colors duration-200 ease-in-out */
  }

  .input-textarea:focus {
    border-color: #4f46e5; /* focus:border-indigo-500 */
    outline: none;
    ring: 2px solid #c7d2fe; /* focus:ring-2 focus:ring-indigo-200 */
  }

  .submit-button {
    background-color: #4f46e5; /* bg-indigo-500 */
    color: #ffffff; /* text-white */
    border: none; /* border-0 */
    padding: 0.5rem 1.5rem; /* py-2 px-6 */
    border-radius: 0.375rem; /* rounded */
    font-size: 1.125rem; /* text-lg */
    cursor: pointer; /* pointer */
    transition: background-color 0.2s ease-in-out; /* transition */
  }

  .submit-button:hover {
    background-color: #4338ca; /* hover:bg-indigo-600 */
  }

  .footer-text {
    font-size: 0.75rem; /* text-xs */
    color: #a0aec0; /* text-gray-500 */
    margin-top: 0.75rem; /* mt-3 */
  }
`;
