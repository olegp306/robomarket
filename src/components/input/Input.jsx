import cn from 'classnames';
import { Field } from 'formik';
import React, { useState } from 'react';
import TextMask from 'react-text-mask';

import { ReactComponent as EyeImage } from './assets/eye.svg';
import styles from './styles.scss';

export const MaskedInputField = ({ mask, ...rest }) => (
  <InputField component={TextMask} guide={false} mask={mask} {...rest} />
);

export const InputField = ({
  name,
  value,
  label,
  fixed,
  component,
  onChange,
  onBlur,
  onKeyEnter,
  type,
  className,
  inputClassName,
  validate,
  ...rest
}) => (
  <Field name={name} validate={validate}>
    {({ field, form: { setFieldValue, errors, touched } }) => {
      const onValueChange = (newValue) => {
        setFieldValue(field.name, newValue.target.value);
        if (onChange) {
          onChange(newValue);
        }
      };
      const onKeyPress = (event) => {
        if (event.charCode === 13) {
          onKeyEnter();
        }
      };

      return (
        <Input
          value={value}
          touched={touched}
          errors={errors}
          label={label}
          name={name}
          fixed={fixed}
          component={component}
          onKeyPress={onKeyPress}
          onBlur={onBlur}
          type={type}
          className={className}
          inputClassName={inputClassName}
          onChange={onValueChange}
          field={field}
          {...rest}
        />
      );
    }}
  </Field>
);

export const Input = ({
  value,
  label,
  name,
  fixed,
  component = 'input',
  onKeyPress,
  type = 'text',
  className,
  inputClassName,
  onChange,
  onBlur,
  touched = {},
  errors = {},
  field = {},
  ...rest
}) => {
  const [focused, setFocus] = useState(false);
  const [passwordIsVisible, setpasswordVisibility] = useState(false);
  const focusHandler = () => setFocus(true);
  const blurHandler = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const togglePassword = () => {
    setpasswordVisibility(!passwordIsVisible);
  };

  const Component = component;

  return fixed ? (
    <div className={styles.FixedWrapper}>
      <div className={styles.FixedLabel}>{label}</div>
      <div className={styles.FixedText}>{value}</div>
    </div>
  ) : (
    <div className={cn(styles.Wrapper, className)}>
      <div className={styles.Inner} data-state={cn({ focus: focused })}>
        <Component
          {...field}
          id={label}
          className={cn(styles.Input, inputClassName, component === 'textarea' && styles.textarea)}
          data-state={cn({
            active: field.value !== undefined,
            error: touched[name] && errors[name],
          })}
          type={passwordIsVisible ? 'text' : type}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onKeyPress={onKeyPress}
          onChange={onChange}
          {...rest}
        />

        {type === 'password' && (
          <div
            role="button"
            className={styles.Eye}
            data-state={cn({ text: passwordIsVisible, hidden: !field.value })}
            onClick={togglePassword}
            onKeyDown={togglePassword}
            tabIndex={-1}
          >
            <EyeImage />
          </div>
        )}
        <label htmlFor={label} className={styles.Label}>
          {label}
        </label>
      </div>

      {touched[name] && errors[name] && <div className={styles.ErrorMessage}>{errors[name]}</div>}
    </div>
  );
};
