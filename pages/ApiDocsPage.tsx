
import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-gray-900 rounded-lg p-4 my-4 text-sm text-gray-200 overflow-x-auto">
    <code>{children}</code>
  </pre>
);

const Endpoint: React.FC<{ method: string; path: string; description: string }> = ({ method, path, description }) => {
  const methodColor = {
    GET: 'text-green-400',
    POST: 'text-blue-400',
    PUT: 'text-yellow-400',
    DELETE: 'text-red-400',
  }[method] || 'text-gray-400';
  
  return (
    <div className="py-4 border-b border-gray-700">
      <h3 className="text-lg font-semibold">
        <span className={`font-mono ${methodColor} mr-3`}>{method}</span>
        <span className="font-mono text-indigo-300">{path}</span>
      </h3>
      <p className="text-gray-400 mt-1">{description}</p>
    </div>
  );
};

const ApiDocsPage: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 mb-2">API Documentation</h1>
        <p className="text-gray-400 mb-8">
          Welcome to the Secure Messenger RESTful API. This documentation provides details on available endpoints.
        </p>

        <section id="authentication" className="mb-12">
          <h2 className="text-2xl font-semibold border-b-2 border-indigo-500 pb-2 mb-4">Authentication</h2>
          <p>
            The API uses backend Bearer Token authentication. Include your token in the Authorization header for all requests.
          </p>
          <CodeBlock>
            {`Authorization: Bearer <YOUR_API_TOKEN>`}
          </CodeBlock>
          <p className="mt-2 text-gray-400">
            Device identity is confirmed on the first authentication with a new token, linking the token to a specific device signature to prevent misuse.
          </p>
        </section>

        <section id="messages" className="mb-12">
          <h2 className="text-2xl font-semibold border-b-2 border-indigo-500 pb-2 mb-4">Messages</h2>
          <Endpoint method="GET" path="/channels/{channelId}/messages" description="Retrieve a list of messages for a channel." />
          <Endpoint method="POST" path="/channels/{channelId}/messages" description="Post a new text message to a channel." />
          <CodeBlock>
            {`// POST Request Body (application/json)
{
  "content": "Hello, world!",
  "type": "text"
}`}
          </CodeBlock>
          <Endpoint method="PUT" path="/messages/{messageId}" description="Update an existing message." />
          <Endpoint method="DELETE" path="/messages/{messageId}" description="Delete a message." />
        </section>

        <section id="media" className="mb-12">
          <h2 className="text-2xl font-semibold border-b-2 border-indigo-500 pb-2 mb-4">Media (Images & Videos)</h2>
          <Endpoint method="GET" path="/media/{mediaId}" description="Retrieve a specific media file." />
          <Endpoint method="POST" path="/channels/{channelId}/media" description="Upload a new image or video file to a channel." />
          <p className="text-gray-400">Use multipart/form-data for uploads.</p>
          <CodeBlock>
            {`// POST Request Body (multipart/form-data)
- file: (binary data of image/video)
- type: "image" or "video"`}
          </CodeBlock>
          <Endpoint method="DELETE" path="/media/{mediaId}" description="Delete a media file." />
        </section>

        <section id="audio" className="mb-12">
          <h2 className="text-2xl font-semibold border-b-2 border-indigo-500 pb-2 mb-4">Audio</h2>
          <Endpoint method="GET" path="/audio/{audioId}" description="Retrieve a specific audio file." />
          <Endpoint method="POST" path="/channels/{channelId}/audio" description="Upload a new audio file to a channel." />
          <p className="text-gray-400">Use multipart/form-data for uploads.</p>
           <CodeBlock>
            {`// POST Request Body (multipart/form-data)
- file: (binary data of audio file)
- type: "audio"`}
          </CodeBlock>
          <Endpoint method="DELETE" path="/audio/{audioId}" description="Delete an audio file." />
        </section>
      </div>
    </div>
  );
};

export default ApiDocsPage;
