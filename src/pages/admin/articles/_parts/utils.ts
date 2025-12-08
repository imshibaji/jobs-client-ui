export function getStatus(status: string) {
  switch (status) {
    case 'draft':
      return 'text-blue-600';
    case 'published':
      return 'text-green-600';
    case 'archived':
      return 'text-yellow-600';
    case 'deleted':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}