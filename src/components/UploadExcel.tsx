// UploadExcel.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Button, Input, Text } from '@chakra-ui/react';
import useUserStore from '../userStore'; 
const baseURL = import.meta.env.VITE_API_BASE_URL;

const UploadExcel: React.FC = () => {
    const { token } = useUserStore();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${baseURL}/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            setMessage(`File uploaded successfully: ${response.data}`);
        } catch (error) {
            console.error(error);
            setMessage('Error uploading file...');
        }
    };

    return (
        <div>
            <Text fontSize="xl" mb={4}>Upload Excel File</Text>
            <form onSubmit={handleSubmit}>
    <Input 
        type="file" 
        name="file" // Ensure this name matches the backend
        accept=".xlsx, .xls" 
        onChange={handleFileChange} 
        mb={4} 
    />
    <Button type="submit" colorScheme="teal">Upload</Button>
</form>

            {message && <Text mt={4}>{message}</Text>}
        </div>
    );
};

export default UploadExcel;
