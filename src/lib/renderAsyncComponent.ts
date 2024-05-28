export async function resolvedComponent(Component: any) {
  const ComponentResolved = await Component();

  return () => ComponentResolved;
}
