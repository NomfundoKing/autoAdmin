import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import ErrorText from '../components/UI/ErrorText';
import Label from '../components/UI/Label';
import Button from '../components/UI/Button';
import StyledForm from '../components/UI/StyledForm';
import SmlButton from '../components/UI/SmlButton';

const FormContainer = styled(Card)
`
  max-width: 500px;
  margin: 50px auto;
  background: #817878ff;
  color : white;
  background:conic-gradient(from 45deg,#2b5e66,#f3f3f5,orange,black,red,yellow ,pink,rgb(62, 32, 32),rgb(159, 123, 26),rgb(77, 4, 4),rgb(28, 2, 53),rgb(23, 16, 16) );

`;


function Signup({ onSignupSuccess, onShowLogin }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!firstname) newErrors.firstName = 'First name is required';
        if (!lastname) newErrors.lastName = 'Last name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const newUser = { firstname, lastname, email, password };
            const updatedUsers = [...users, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);

            alert("Signup successful!");
            if (onSignupSuccess) onSignupSuccess();

            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <FormContainer>
            <h2>Create an Account</h2>
            <StyledForm onSubmit={handleSubmit}>
                <Label>
                    First Name: <Input type="text"  value={firstname}  onChange={(e) => setFirstname(e.target.value)} />
                    {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
                </Label>
                
                <Label>
                    Last Name: <Input type="text" value={lastname}  onChange={(e) => setLastname(e.target.value)} />
                    {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </Label>
                
                <Label>
                    Email: <Input  type="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </Label>
                
                <Label>
                    Password: <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </Label>
                
                <Label>
                    Confirm Password: <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                </Label>
                <Button type="submit">Sign Up</Button>
            </StyledForm>
            <p>
                Already have an account? {' '}
                <SmlButton type="button" onClick={onShowLogin}>Login</SmlButton>
            </p>
        </FormContainer>
    );
}

export default Signup;