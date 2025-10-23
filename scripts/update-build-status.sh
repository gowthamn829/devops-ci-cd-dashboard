#!/bin/bash

STATUS=$1
COMMIT=$2
DURATION=$3
ACTOR=$4

# Get current time in UTC
TIME=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

case $STATUS in
  "success")
    STATUS_TEXT="SUCCESS"
    MESSAGE="- Frontend: Built successfully\n- Backend: Deployed to Kubernetes\n- Tests: All passed\n- Deployment: Complete"
    ;;
  "failure")
    STATUS_TEXT="FAILED"
    MESSAGE="- Frontend: Build failed\n- Backend: Deployment failed\n- Tests: Some tests failed\n- Deployment: Rolled back"
    ;;
  "progress")
    STATUS_TEXT="IN_PROGRESS"
    MESSAGE="- Frontend: Building...\n- Backend: Deploying...\n- Tests: Running...\n- Deployment: In progress"
    ;;
  *)
    STATUS_TEXT="UNKNOWN"
    MESSAGE="- Status: Unknown build state"
    ;;
esac

# Create build status file
cat > BUILD_STATUS.md << EOL
# Build Status

## #$GITHUB_RUN_NUMBER
Commit: $COMMIT
Duration: $DURATION
Triggered by: $ACTOR
Time: $TIME

---

### $STATUS_TEXT
$MESSAGE
EOL

echo "Build status updated to: $STATUS_TEXT"
