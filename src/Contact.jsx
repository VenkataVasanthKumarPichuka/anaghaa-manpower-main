import { useState } from 'react';
import { addContact, sendMessage } from '../services/aws-services';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Save to DynamoDB
      await addContact(form);
      
      // Send to SQS queue
      await sendMessage(
        'http://localhost:4566/000000000000/anaghaa-email-queue',
        form
      );

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-gray-500 mb-6">Powered by AWS DynamoDB + SQS (Floci)</p>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg disabled:opacity-50 transition"
          >
            {status === 'sending' ? 'Saving to DynamoDB...' : 'Send Message'}
          </button>
        </div>

        {status === 'sent' && (
          <p className="mt-4 text-green-600 text-center font-medium">
            ✅ Saved to DynamoDB & queued in SQS!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 text-center font-medium">❌ Failed!</p>
        )}
      </form>
    </div>
  );
}