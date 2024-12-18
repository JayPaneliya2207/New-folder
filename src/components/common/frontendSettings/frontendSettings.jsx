import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageHeading } from '../../../redux/actions/commonAction';
import { common } from '../../../helper/Common';
import styles from './FrontendSettings.module.css';
import '../../../../node_modules/cropperjs/dist/cropper.css';


const FrontendSettings = () => {
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    mobile: '',
    logoDark: '',
    logoWhite: '',
    favicon: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(setPageHeading({
        pageHeading: `${settings.siteName} - Frontend Settings`,  // Use template literals
        title: `${settings.siteName} - Frontend Settings`,
      }));
    fetchSettings();
  }, [dispatch]);

  const fetchSettings = async () => {
    const data = { user_id: store.userData.user_id };
    common.getAPI({ method: 'POST', url: 'admin/getSettings', data }, (resp) => {
      if (resp.status === 'success') {
        console.log(resp);
        setSettings(resp.data.frontendSettings);
      }
    });
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, type) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append(type, file);  // Append the correct field name (logoDark, logoWhite, etc.)

  common.getAPI({
    method: 'POST',
    url: 'admin/uploadFile',
    data: formData,
  }, (resp) => {
    if (resp.status === 'success') {
      setSettings({ ...settings, [type]: resp.data[type] });
    }
  });
};

  



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { user_id: store.userData.user_id, ...settings };
    if (settings.siteName === '' || settings.contactEmail === '') {
      setError('Required fields cannot be empty.');
      return;
    }
    common.getAPI({ method: 'POST', url: 'admin/updateFrontendSettings', data }, (resp) => {
      if (resp.status === 'success') setError('');
    });
  };

  return (
    <div className="pu_container">
    <div className={styles.profile_wrapper}>
        <div className={styles.profile_left}>

        </div>

        <div className={styles.profile_right}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={styles.profile_box}>
                    <div className={styles.profile_box_title}>
                        <h3>Website Settings</h3>
                    </div>
                </div>
                <div className={styles.profile_box}>
                <div className={styles.profile_box_body}></div>
                <div className={styles.formGroup}>
                    <div className="pu_input_wrapper" style={{ marginBottom: 20 }}>   
                        <label className="pu_input_wrapper" style={{ marginBottom: 20 }}>Site Name:</label>
                        <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} className={styles.forminput} />
                    </div> 
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Site Description:</label>
                    <input type="text" name="siteDescription" value={settings.siteDescription} onChange={handleChange} className={styles.forminput} />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Contact Email:</label>
                    <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className={styles.forminput} />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Mobile:</label>
                    <input type="text" name="mobile" value={settings.mobile} onChange={handleChange} className={styles.forminput} />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Logo (Dark):</label>
                    <input type="file" name="logoDark" onChange={(e) => handleFileUpload(e, 'logoDark')} className={styles.forminput} />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Logo (White):</label>
                    <input type="file" name="logoWhite" onChange={(e) => handleFileUpload(e, 'logoWhite')} className={styles.forminput} />
                </div>
                
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Favicon:</label>
                    <input type="file" name="favicon" onChange={(e) => handleFileUpload(e, 'favicon')} className={styles.forminput} />
                </div>
                
                <button type="submit" className={styles.formbutton}>Save Settings</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </form>
        </div>
    </div>
    </div>

  );
};

export default FrontendSettings;
