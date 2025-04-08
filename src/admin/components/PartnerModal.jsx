import styles from "../styles/Admin.module.css";

const PartnerModal = ({ isOpen, onClose, onAdd, formData, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Add Clients</h3>
        <form onSubmit={handleSubmit} className={styles.formGrid2Col}>
          <label>Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className={styles.fullWidth}>Logo
            <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
          <button type="submit" className={`${styles.submitBtn} ${styles.fullWidth}`}>Add</button>
        </form>
        <button className={styles.closeModal} onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default PartnerModal;
