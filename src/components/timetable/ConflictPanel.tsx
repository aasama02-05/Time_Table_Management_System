import { Conflict } from '@/types/domain';

interface ConflictPanelProps {
  conflicts: Conflict[];
}

export function ConflictPanel({ conflicts }: ConflictPanelProps) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        {conflicts.length === 0 ? 'No conflicts detected' : `${conflicts.length} conflicts found`}
      </p>
    </div>
  );
}