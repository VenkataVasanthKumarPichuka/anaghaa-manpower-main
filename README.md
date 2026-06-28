1. Check Docker Status
powershell
docker info
powershell
docker ps -a
powershell
docker ps -a | findstr floci
2. Start Floci Container
powershell
docker start floci
3. Configure AWS CLI for Floci
powershell
aws configure set aws_access_key_id test
powershell
aws configure set aws_secret_access_key test
powershell
aws configure set region us-east-1
4. Test Floci S3 (Create Test Bucket)
powershell
aws s3 mb s3://test-bucket --endpoint-url http://localhost:4566
powershell
aws s3 ls --endpoint-url http://localhost:4566
5. Upload Test File to Floci
powershell
echo "Hello Floci" > test.txt
powershell
aws s3 cp test.txt s3://test-bucket/ --endpoint-url http://localhost:4566
powershell
aws s3 ls s3://test-bucket/ --endpoint-url http://localhost:4566
6. Build Your React Project
powershell
cd C:\Users\PichukaVasanthKumar\Desktop\anaghaa-manpower-main
powershell
npm run build
7. Deploy to Floci S3
powershell
aws s3 mb s3://anaghaa-website-bucket --endpoint-url http://localhost:4566
powershell
aws s3 sync ./dist s3://anaghaa-website-bucket --endpoint-url http://localhost:4566 --delete
8. Verify Deployment
powershell
aws s3 ls s3://anaghaa-website-bucket/ --endpoint-url http://localhost:4566
9. Access Your Local Site
Open browser to:
plain
http://localhost:4566/anaghaa-website-bucket/
10. GitHub CLI Setup (Optional - for adding secrets via terminal)
powershell
winget install --id GitHub.cli
powershell
gh --version
powershell
gh auth login
11. Add GitHub Secrets (via CLI - if authenticated)
powershell
gh secret set DOCKER_USERNAME --repo "vasanth160/anaghaa-manpower" --body "vasanth160"
powershell
gh secret set DOCKER_PASSWORD --repo "vasanth160/anaghaa-manpower" --body ""
powershell
gh secret list --repo "vasanth160/anaghaa-manpower"
12. Docker Login (Local Testing)
powershell
docker login -u vasanth160
(Enter password/token when prompted)
Summary: What Works Today
Table
Component	Status
Floci (Local S3)	✅ Working
Docker Desktop	✅ Running
Local Build	✅ Successful
Local Deployment	✅ Files uploaded to Floci

Check Floci Container is Running
powershell
docker ps | findstr floci
You should see:
plain
floci   Up   0.0.0.0:4566->4566/tcp
If not running:
powershell
docker start floci
2. Check Floci S3 Bucket Exists
powershell
aws s3 ls --endpoint-url http://localhost:4566
You should see:
plain
2026-06-28 19:07:42 anaghaa-website-bucket
3. Check Files in the Bucket
powershell
aws s3 ls s3://anaghaa-website-bucket/ --endpoint-url http://localhost:4566
You should see:
plain
                           PRE assets/
2026-06-28 19:07:43     192844 anaghaa-logo.png
2026-06-28 19:07:43       9522 favicon.svg
2026-06-28 19:07:43       5031 icons.svg
2026-06-28 19:07:43        471 index.html
