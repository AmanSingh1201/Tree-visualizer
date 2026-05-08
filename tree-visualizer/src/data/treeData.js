/**
 * treeData.js
 * -----------
 * Sample hierarchical tree data for the Tree Visualizer.
 * Each node has:
 *   - id: unique string identifier
 *   - label: display name
 *   - meta: optional metadata shown on hover/select
 *   - children: array of child nodes (can be empty or absent)
 */

export const treeData = {
  id: 'root',
  label: 'Root',
  meta: { type: 'Root Node', depth: 0, description: 'Top-level entry point' },
  children: [
    {
      id: 'A',
      label: 'Module A',
      meta: { type: 'Module', depth: 1, description: 'Frontend subsystem' },
      children: [
        {
          id: 'A1',
          label: 'Component A1',
          meta: { type: 'Component', depth: 2, description: 'UI rendering layer' },
          children: [
            {
              id: 'A1a',
              label: 'Service A1a',
              meta: { type: 'Service', depth: 3, description: 'Data fetching' },
              children: [],
            },
            {
              id: 'A1b',
              label: 'Service A1b',
              meta: { type: 'Service', depth: 3, description: 'State management' },
              children: [],
            },
          ],
        },
        {
          id: 'A2',
          label: 'Component A2',
          meta: { type: 'Component', depth: 2, description: 'Form handler' },
          children: [
            {
              id: 'A2a',
              label: 'Util A2a',
              meta: { type: 'Utility', depth: 3, description: 'Validation logic' },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'B',
      label: 'Module B',
      meta: { type: 'Module', depth: 1, description: 'Backend subsystem' },
      children: [
        {
          id: 'B1',
          label: 'Component B1',
          meta: { type: 'Component', depth: 2, description: 'API gateway' },
          children: [
            {
              id: 'B1a',
              label: 'Service B1a',
              meta: { type: 'Service', depth: 3, description: 'Auth service' },
              children: [],
            },
            {
              id: 'B1b',
              label: 'Service B1b',
              meta: { type: 'Service', depth: 3, description: 'Rate limiter' },
              children: [],
            },
            {
              id: 'B1c',
              label: 'Service B1c',
              meta: { type: 'Service', depth: 3, description: 'Cache layer' },
              children: [],
            },
          ],
        },
        {
          id: 'B2',
          label: 'Component B2',
          meta: { type: 'Component', depth: 2, description: 'Database layer' },
          children: [
            {
              id: 'B2a',
              label: 'Util B2a',
              meta: { type: 'Utility', depth: 3, description: 'Query builder' },
              children: [],
            },
            {
              id: 'B2b',
              label: 'Util B2b',
              meta: { type: 'Utility', depth: 3, description: 'Migration runner' },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'C',
      label: 'Module C',
      meta: { type: 'Module', depth: 1, description: 'DevOps pipeline' },
      children: [
        {
          id: 'C1',
          label: 'Component C1',
          meta: { type: 'Component', depth: 2, description: 'CI runner' },
          children: [
            {
              id: 'C1a',
              label: 'Step C1a',
              meta: { type: 'Step', depth: 3, description: 'Unit tests' },
              children: [],
            },
            {
              id: 'C1b',
              label: 'Step C1b',
              meta: { type: 'Step', depth: 3, description: 'Integration tests' },
              children: [],
            },
          ],
        },
        {
          id: 'C2',
          label: 'Component C2',
          meta: { type: 'Component', depth: 2, description: 'CD pipeline' },
          children: [
            {
              id: 'C2a',
              label: 'Step C2a',
              meta: { type: 'Step', depth: 3, description: 'Build & bundle' },
              children: [],
            },
            {
              id: 'C2b',
              label: 'Step C2b',
              meta: { type: 'Step', depth: 3, description: 'Deploy to cloud' },
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
