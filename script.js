$(document).ready(function() {
    // Add smooth animation delays
    $('.form-group').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Phone number formatting
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        $(this).val(value);
    });

    // Date formatting
    $('#birthDate').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length >= 4) {
            value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        } else if (value.length >= 2) {
            value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        $(this).val(value);
    });

    // Name fields - only allow letters and spaces
    $('#firstName, #middleName, #lastName, #motherName').on('input', function() {
        let value = $(this).val();
        // Remove any character that is not a letter or space
        value = value.replace(/[^a-zA-Z\s]/g, '');
        $(this).val(value);
    });

    // Address fields - only allow letters, numbers, spaces, and basic punctuation
    $('#address').on('input', function() {
        let value = $(this).val();
        // Allow letters, numbers, spaces, commas, periods, hyphens, and apostrophes
        value = value.replace(/[^a-zA-Z0-9\s,.\-']/g, '');
        $(this).val(value);
    });

    // City and State - only allow letters and spaces
    $('#city, #state').on('input', function() {
        let value = $(this).val();
        // Remove any character that is not a letter or space
        value = value.replace(/[^a-zA-Z\s]/g, '');
        $(this).val(value);
    });

    // Class field - allow letters, numbers, spaces, and basic punctuation
    $('#class').on('input', function() {
        let value = $(this).val();
        // Allow letters, numbers, spaces, and basic punctuation for academic terms
        value = value.replace(/[^a-zA-Z0-9\s,.\-']/g, '');
        $(this).val(value);
    });

    // Division - only allow letters and numbers
    $('#division').on('input', function() {
        let value = $(this).val();
        // Remove any character that is not a letter or number
        value = value.replace(/[^a-zA-Z0-9]/g, '');
        $(this).val(value);
    });

    // Sports and Hobbies - only allow letters, spaces, and commas
    $('#sports, #hobbies').on('input', function() {
        let value = $(this).val();
        // Allow letters, spaces, and commas for listing multiple items
        value = value.replace(/[^a-zA-Z\s,]/g, '');
        $(this).val(value);
    });

    // ZIP Code - only allow numbers and hyphens
    $('#zipCode').on('input', function() {
        let value = $(this).val();
        // Allow only numbers and hyphens for ZIP codes
        value = value.replace(/[^0-9\-]/g, '');
        $(this).val(value);
    });

    // Real-time validation
    $('input[required], select[required], textarea[required]').on('blur', function() {
        validateField($(this));
    });

    // Form submission
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    function validateField($field) {
        const fieldId = $field.attr('id');
        const value = $field.val().trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        $field.removeClass('input-error');
        $(`#${fieldId}Error`).hide();

        // Required field validation
        if ($field.prop('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Specific validations
        switch (fieldId) {
            case 'firstName':
            case 'middleName':
            case 'lastName':
                if (value && !/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid name (letters only)';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'birthDate':
                const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                if (value && !dateRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter date in MM/DD/YYYY format';
                } else if (value) {
                    const date = new Date(value);
                    const today = new Date();
                    if (date >= today) {
                        isValid = false;
                        errorMessage = 'Birth date must be in the past';
                    }
                }
                break;

            case 'rollNo':
                if (value && !/^[A-Za-z0-9]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Roll number should contain only letters and numbers';
                }
                break;

            case 'prnNo':
                if (value && !/^[A-Za-z0-9]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'PRN number should contain only letters and numbers';
                }
                break;

            case 'zipCode':
                if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid ZIP code';
                }
                break;

            case 'whyRegister':
                if (value && value.length < 20) {
                    isValid = false;
                    errorMessage = 'Please provide at least 20 characters explaining your motivation';
                }
                break;
        }

        if (!isValid) {
            $field.addClass('input-error');
            $(`#${fieldId}Error`).text(errorMessage).show();
        }

        return isValid;
    }

    function validateForm() {
        let isFormValid = true;

        // Validate all required fields
        $('input[required], select[required], textarea[required]').each(function() {
            if (!validateField($(this))) {
                isFormValid = false;
            }
        });

        // Check if at least one identification method is selected
        const identificationChecked = $('input[name="identification"]:checked').length > 0;
        if (!identificationChecked) {
            alert('Please select at least one form of identification.');
            isFormValid = false;
        }

        return isFormValid;
    }

    function submitForm() {
        const $submitBtn = $('#submitBtn');
        const $loading = $('#loading');

        // Disable submit button and show loading
        $submitBtn.prop('disabled', true);
        $loading.show();

        // Collect form data
        const formData = {
            personalInfo: {
                firstName: $('#firstName').val(),
                middleName: $('#middleName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                birthDate: $('#birthDate').val(),
                class: $('#class').val(),
                division: $('#division').val(),
                rollNo: $('#rollNo').val(),
                prnNo: $('#prnNo').val(),
                motherName: $('#motherName').val()
            },
            address: {
                street: $('#address').val(),
                city: $('#city').val(),
                state: $('#state').val(),
                zipCode: $('#zipCode').val(),
                country: $('#country').val()
            },
            education: $('input[name="education"]:checked').val(),
            identification: $('input[name="identification"]:checked').map(function() {
                return this.value;
            }).get(),
            additionalInfo: {
                sports: $('#sports').val(),
                hobbies: $('#hobbies').val(),
                whyRegister: $('#whyRegister').val()
            }
        };

        // Simulate API call
        setTimeout(function() {
            console.log('Registration Data:', formData);
            
            // Show success message
            $('#successMessage').slideDown();
            
            // Reset form
            $('#registrationForm')[0].reset();
            $('.input-error').removeClass('input-error');
            $('.error').hide();
            
            // Re-enable submit button
            $submitBtn.prop('disabled', false);
            $loading.hide();
            
            // Scroll to success message
            $('html, body').animate({
                scrollTop: $('#successMessage').offset().top - 20
            }, 500);
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#successMessage').slideUp();
            }, 5000);
            
        }, 2000);
    }

    // Add some interactive effects
    $('input, select, textarea').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });
});