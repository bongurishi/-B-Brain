export const gcpProvider = {
  name: 'GCP',
  resources: ['GKE', 'Cloud SQL', 'Compute Engine'],
  connect() { console.log('GCP connected'); }
};
