export const awsProvider = {
  name: 'AWS',
  resources: ['EC2', 'EKS', 'RDS'],
  connect() { console.log('AWS connected'); }
};
