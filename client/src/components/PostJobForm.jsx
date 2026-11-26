// View component: lets a business owner post a new job.
import { useState } from 'react';
import { createJob } from '../services/api';

const emptyForm = {
    businessName: '',
    title: '',
    date: '',
    startTime: '',
    hours: '',
    location: '',
    payPerHour: '',
    spotsNeeded: '',
    description: '',
};

// Turns number fields into numbers, but keeps empty fields empty
// so the backend reports "missing" instead of "has to be above 0"
function toNumber(value) {
    return value === '' ? '' : Number(value);
}

function PostJobForm({ onJobPosted }) {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Updates the matching field whenever the user types
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            await createJob({
                ...formData,
                hours: toNumber(formData.hours),
                payPerHour: toNumber(formData.payPerHour),
                spotsNeeded: toNumber(formData.spotsNeeded),
            });

            setSuccessMessage('Job posted successfully!');
            setFormData(emptyForm);
            onJobPosted(); // Tell App to reload the job list
        } catch (error) {
            setErrors(error.details || ['Could not reach the server. Please try again.']);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="post-job-form" onSubmit={handleSubmit}>
            <h2>Post a Job</h2>

            <input name="businessName" placeholder="Business name" value={formData.businessName} onChange={handleChange} />
            <input name="title" placeholder="Job title" value={formData.title} onChange={handleChange} />
            <input name="date" type="date" value={formData.date} onChange={handleChange} />
            <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
            <input name="hours" type="number" placeholder="Hours" value={formData.hours} onChange={handleChange} />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <input name="payPerHour" type="number" placeholder="Pay per hour ($)" value={formData.payPerHour} onChange={handleChange} />
            <input name="spotsNeeded" type="number" placeholder="Workers needed" value={formData.spotsNeeded} onChange={handleChange} />
            <textarea name="description" placeholder="Description (optional)" value={formData.description} onChange={handleChange} />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>

            {successMessage && <p className="success-message">{successMessage}</p>}

            {errors.length > 0 && (
                <ul className="error-list">
                    {errors.map(message => <li key={message}>{message}</li>)}
                </ul>
            )}
        </form>
    );
}

export default PostJobForm;