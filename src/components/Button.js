// src/components/Button.js
export default function Button({ text, onClick }) {
    return <button onClick={onClick}>{text}</button>;
}