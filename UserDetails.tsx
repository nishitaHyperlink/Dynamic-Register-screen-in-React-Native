import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';

const UserDetails = ({navigation}: any) => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [isFocused2, setIsFocused2] = useState(false);
  const [lastname, setLastName] = useState('');
  const [isFocused3, setIsFocused3] = useState(false);
  const [role, setRole] = useState('');
  const [isFocused4, setIsFocused4] = useState(false);
  const [email, setEmail] = useState('');
  const [isFocused5, setIsFocused5] = useState(false);
  const [phone_number, setPhoneNumber] = useState('');
  const [isFocused6, setIsFocused6] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [validationResult, setValidationResult] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [firstnameError, setFirstNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phone_numberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [country_codeError, setcountrycodeError] = useState(false);

  const pickerRef = useRef<any>(null);
  const country_code = useRef<PhoneInput>(null);

  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  const handlePickerChange = (itemValue: string) => {
    setRole(itemValue);
  };

  const handleOptionPress = (value: any) => {
    setRole(value);
    setSelectedItem(value);
    setPickerOpen(false);
  };

  const handleTextInputBlur = () => {
    setIsFocused3(false);
    setPickerOpen(false);
  };

  const handleTextInputFocus = () => {
    setIsFocused3(true);
    setPickerOpen(true);
    if (pickerRef.current) {
      pickerRef.current.focus();
    }
  };

  const lastNameInputRef = useRef<TextInput>(null);
  const roleInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const saveData = async () => {
    let errorMessage = '';
  
 
    if (!firstname) {
      setFirstNameError(true);
      errorMessage += 'First name is empty,  ';
    } else {
      setFirstNameError(false);
    }
  
    if (!lastname) {
      setLastNameError(true);
      errorMessage += 'Last name is empty, ';
    } else {
      setLastNameError(false);
    }
  
    if (!role) {
      setRoleError(true);
      errorMessage += 'Role is empty, ';
    } else {
      setRoleError(false);
    }
  
    if (!email) {
      setEmailError(true);
      errorMessage += 'Email is empty, ';
    } else {
      setEmailError(false);
    }
  
    if (!password) {
      setPasswordError(true);
      errorMessage += 'Password is empty, ';
    } else {
      setPasswordError(false);
    }
  
    if (errorMessage !== '') {
      console.error('Validation Error:', errorMessage);
      return;
    }
  
    try {
      const response = await axios.post(
        '//API',
        {
          firstname,
          lastname,
          email:'nishitagiri3@gmail.com',
          password:'Nishi@123',
          country_code: '+91',
          phone_number, 
          role, 
          
        },
      );
  
      if (response.status === 200) {
        console.log('Data saved successfully!');
      
        navigation.navigate('DeliveryAddressDetail');
      } else {
        console.error('Status Code:', response.status);
        console.error('Data save failed:', response.data);
      }
    } catch (error : any) {
      console.error('Error saving data:', error.message);
    }
  };
  

  const handleNextButtonPress = async () => {

    if (!firstname || !lastname || !role || !email || !password) {
    
      setFirstNameError(!firstname);
      setLastNameError(!lastname);
      setRoleError(!role);
      setEmailError(!email);
      setPasswordError(!password);
  

      return;
    }
  
 
    setFirstNameError(false);
    setLastNameError(false);
    setRoleError(false);
    setEmailError(false);
    setPasswordError(false);
  
   
    await saveData();
    navigation.navigate('DeliveryAddressDetail'); 
  };
  
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 100,
          marginTop: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{marginTop: 5, marginLeft: 10}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: '#424242',
            marginLeft: 70,
            // marginTop: 0,
            alignSelf: 'center',
          }}>
          User details
        </Text>
      </View>

      <ScrollView keyboardDismissMode="on-drag" style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              marginTop: -35,
              width: '100%',
              height: 850,
            }}>
            {/* First name */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: 55,
                backgroundColor: 'white',
              }}>
              <Text
                style={[
                  styles.label,
                  (isFocused1 || firstname !== '') && styles.labelFocused,
                ]}>
                First name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused1 || firstname !== '') && styles.inputFocused,
                ]}
                value={firstname}
               // onChangeText={setFirstName}
               onChangeText={(text) => {
                setFirstName(text);
                setFirstNameError(false);  
                            }}
                placeholder=" "
                underlineColorAndroid="transparent"
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                autoFocus={false}
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
              />
              {firstnameError && (
                <Text style={{color: '#DA5466', marginLeft: 0, fontSize: 10}}>
                  Please Enter a valid First Name,{' '}
                </Text>
              )}
            </View>

            

            {/* Last name */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: 145,
                backgroundColor: 'white',
              }}>
              <Text
                style={[
                  styles.label,
                  (isFocused2 || lastname !== '') && styles.labelFocused,
                ]}>
                Last name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused2 || lastname !== '') && styles.inputFocused,
                ]}
                value={lastname}
              //  onChangeText={setLastName}
              onChangeText={(text) => {
                setLastName(text);
                setLastNameError(false);  
              }}
                placeholder=" "
                underlineColorAndroid="transparent"
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                ref={lastNameInputRef}
                onSubmitEditing={() => roleInputRef.current?.focus()}
              />
              {lastnameError && (
                <Text style={{color: '#DA5466', marginLeft: 0, fontSize: 10}}>
                  Please Enter a valid Last Name,{' '}
                </Text>
              )}
            </View>

            {/* Role */}
            <View style={{width: '90%', position: 'absolute', top: 240}}>
              <TouchableOpacity onPress={handleTextInputFocus}>
                <Text
                  style={[
                    styles.label,
                    (isFocused3 || role !== '') && styles.labelFocused,
                  ]}>
                  Role
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    (isFocused3 || role !== '') && styles.inputFocused,
                  ]}
                  value={role}
                 // onChangeText={setRole}
                 onChangeText={(text) => {
                  setRole(text);
                  setRoleError(false); 
                }}
                  placeholder=" "
                  underlineColorAndroid="transparent"
                  onFocus={handleTextInputFocus}
                  onBlur={handleTextInputBlur}
                  ref={roleInputRef}
                  editable={false}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />
                {roleError && (
                  <Text
                    style={{
                      color: '#DA5466',
                      marginLeft: 0,
                      fontSize: 10,
                      marginTop: 2,
                    }}>
                    Please select Role,{' '}
                  </Text>
                )}
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    right: 0,
                    top: 20,
                  }}
                  source={require('../assets/down.png')}
                />
              </TouchableOpacity>

              {pickerOpen && (
                <View style={styles.pickerContainer}>
                  <TouchableOpacity onPress={() => handleOptionPress('1')}>
                    <Text
                      style={[
                        styles.option,
                        selectedItem === '1' && styles.selectedOption,
                      ]}>
                      1
                    </Text>
                    {selectedItem === '1' && (
                      <Image
                        source={require('../assets/check.png')}
                        style={styles.checkmarkImage}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionPress('2')}>
                    <Text
                      style={[
                        styles.option,
                        selectedItem === '2' && styles.selectedOption,
                      ]}>
                      2
                    </Text>
                    {selectedItem === '2' && (
                      <Image
                        source={require('../assets/check.png')}
                        style={styles.checkmarkImage}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionPress('3')}>
                    <Text
                      style={[
                        styles.option,
                        selectedItem === '3' && styles.selectedOption,
                      ]}>
                      3
                    </Text>
                    {selectedItem === '3' && (
                      <Image
                        source={require('../assets/check.png')}
                        style={styles.checkmarkImage}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionPress('4')}>
                    <Text
                      style={[
                        styles.option,
                        selectedItem === '4' && styles.selectedOption,
                      ]}>
                      4
                    </Text>
                    {selectedItem === '4' && (
                      <Image
                        source={require('../assets/check.png')}
                        style={styles.checkmarkImage}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Email */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: pickerOpen ? 430 : 335,
              }}>
              <Text
                style={[
                  styles.label,
                  (isFocused4 || email !== '') && styles.labelFocused,
                ]}>
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused4 || email !== '') && styles.inputFocused,
                ]}
                value={email}
              //  onChangeText={setEmail}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(false);  
              }}
                placeholder=" "
                underlineColorAndroid="transparent"
                onFocus={() => setIsFocused4(true)}
                onBlur={() => setIsFocused4(false)}
                ref={emailInputRef}
                onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
              />
              {emailError && (
                <Text
                  style={{
                    color: '#DA5466',
                    marginLeft: 0,
                    fontSize: 10,
                    marginTop: 2,
                  }}>
                  Please Enter a valid Email ID,{' '}
                </Text>
              )}
            </View>

            {/* Phone number  */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: pickerOpen ? 530 : 430,
              }}>
              <Text
                style={[
                  styles.label1,
                  (isFocused5 || phone_number !== '') && styles.labelFocused,
                ]}>
                Phone number
              </Text>
              <TextInput
                style={[
                  styles.input1,
                  (isFocused5 || phone_number !== '') && styles.inputFocused,
                ]}
                value={phone_number}
              // onChangeText={setPhoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setPhoneNumberError(false); 
              }}
                placeholder="(000) 000-00-00"
                underlineColorAndroid="transparent"
                onFocus={() => setIsFocused5(true)}
                onBlur={() => setIsFocused5(false)}
                ref={phoneNumberInputRef}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              {phone_numberError && (
                <Text
                  style={{
                    color: '#DA5466',
                    marginLeft: 0,
                    fontSize: 10,
                    marginTop: 2,
                  }}>
                  Please Enter a valid Phone number,{' '}
                </Text>
              )}

              <View
                style={{
                  height: 24,
                  width: 35,
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 25,
                  left: 0,
                }}>
                <PhoneInput
                  textInputStyle={{
                    fontSize: 16,
                    height: 24,

                    color: '#191C1F',
                    backgroundColor: 'white',
                    paddingTop: 0,
                    paddingBottom: 4,
                    borderBottomColor: 'gray',
                  }}
                  containerStyle={{
                    backgroundColor: 'white',
                    height: 30,
                    borderBottomColor: 'gray',
                    right: 15,
                  }}
                  textContainerStyle={{
                    backgroundColor: 'white',
                    borderBottomColor: 'gray',
                  }}
                  ref={country_code}
                  placeholder="(000) 000-00-00"
                  defaultValue={value}
                  defaultCode="MT"
                  layout="second"
                  onChangeText={text => {
                    setValue(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                />
              </View>
            </View>

            {/* Password */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: pickerOpen ? 630 : 525,
              }}>
              <Text
                style={[
                  styles.label,
                  (isFocused6 || password !== '') && styles.labelFocused,
                ]}>
                Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  (isFocused6 || password !== '') && styles.inputFocused,
                ]}
                value={password}
              //  onChangeText={setPassword}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(false);  
              }}
                placeholder=" "
                secureTextEntry={!isPasswordVisible}
                underlineColorAndroid="transparent"
                onFocus={() => setIsFocused6(true)}
                onBlur={() => setIsFocused6(false)}
                ref={passwordInputRef}
              />
              {passwordError && (
                <Text
                  style={{
                    color: '#DA5466',
                    marginLeft: 0,
                    fontSize: 10,
                    marginTop: 2,
                  }}>
                  Please Enter a valid Password{' '}
                </Text>
              )}
              <TouchableOpacity
                style={{top: 20, width: 40, position: 'absolute', right: -10}}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Image
                  source={
                    isPasswordVisible
                      ? require('../assets/eye.png')
                      : require('../assets/hidden.png')
                  }
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '50%',
                height: 20,
                backgroundColor: 'white',
                position: 'absolute',
                top: pickerOpen ? 730 : 710,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 13, color: '#858587', fontWeight: '400'}}>
                You have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text
                  style={{
                    color: '#DA5466',
                    fontSize: 13,
                    fontWeight: '600',
                    left: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              //  onPress={() => navigation.native('DeliveryAddress')}
              onPress={handleNextButtonPress}
              style={{
                width: '85%',
                height: 55,
                borderColor: '#DA5466',
                borderWidth: 1,
                borderRadius: 10,
                alignSelf: 'center',
                // marginTop: pickerOpen ? 720 : 720,
                position:'absolute',
                bottom: pickerOpen ? 20 : 40,
              }}>
              <Text
                style={{
                  color: '#DA5466',
                  fontSize: 14,
                  fontWeight: '700',
                  textAlign: 'center',
                  top: 15,
                 
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    left: 0,
    top: 20,
    fontSize: 16,
    color: '#858587',
    fontWeight: '400',
  },
  labelFocused: {
    top: -5,
    color: '#DA5466',
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E5',
    marginTop: 15,
    fontSize: 18,
    color: 'black',
  },
  inputFocused: {
    borderBottomColor: '#DA5466',
  },
  pickerContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    bottom: 18,
    height: 150,
  },
  option: {
    paddingVertical: 6,
    left: 20,
    color: '#111827',
    fontSize: 15,
    top: 5,
  },
  label1: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 16,
    color: '#858587',
    fontWeight: '400',
  },
  input1: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E5',
    marginTop: 18,
    fontSize: 18,
  },
  selectedOption: {
    backgroundColor: '#F9FAFB',
    // backgroundColor: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    left: 0,
    top: 5,
  },
  checkmarkImage: {
    width: 16,
    height: 16,
    position: 'absolute',
    right: 10,
    top: 18,

    marginLeft: 5,
  },
});

export default UserDetails;
