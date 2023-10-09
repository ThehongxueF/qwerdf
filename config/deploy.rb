require 'mina/deploy'
require 'mina/git'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :application_name, 'admin-pc'
set :domain, 'dev2.maikeji.cn'
set :deploy_to, '/srv/thirdparty/yuanshi/admin-pc'
set :repository, 'git@e.coding.net:maikeji/academy/admin-pc.git'
set :branch, 'dev'

# Optional settings:
set :user, 'deploy'          # Username in the server to SSH to.
#   set :port, '30000'           # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# Shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# Some plugins already add folders to shared_dirs like `mina/rails` add `public/assets`, `vendor/bundle` and many more
# run `mina -d` to see all folders and files already included in `shared_dirs` and `shared_files`
# set :shared_dirs, fetch(:shared_dirs, []).push('share1', 'share2')
# set :shared_files, fetch(:shared_files, []).push('.env.local', '.env.development.local')

set :keep_releases, 0

# This task is the environment that is loaded for all remote run commands, such as
# `mina deploy` or `mina rake`.
task :remote_environment do
end

# Put any custom commands you need to run at setup
# All paths in `shared_dirs` and `shared_paths` will be created on their own.
task :setup do
end

desc "Deploys the current version to the server."
task :deploy do
  invoke :'git:ensure_pushed' unless set?(:skip_ensure_pushed)
  deploy do
    command %{source ~/.zshrc}
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    copy_files
    command %{nvm use lts/gallium} # 指定node版本
    comment 'Installing packages'
    command %{yarn}
    comment 'Building'
    command %{yarn run build:dev}
    invoke :'deploy:cleanup'

    on :launch do
      in_path(fetch(:current_path)) do
        command %{mkdir -p tmp/}
        command %{touch tmp/restart.txt}
      end
    end
  end

  # you can use `run :local` to run tasks on local machine before of after the deploy scripts
  # run(:local){ say 'done' }
end

# 复制旧版的 node_modules 和 dist 文件
def copy_files
  comment 'Copying node_modules and dist from old release'
  command %(max_release=$(ls #{fetch(:releases_path)} -A1 | sort -rn | head -1))
  command %(
    if [ "$max_release" -gt 0 ]; then
      cp -r #{fetch(:releases_path)}/$max_release/node_modules node_modules
      cp -r #{fetch(:releases_path)}/$max_release/dist dist
    fi
  )
end

# For help in making your deploy script, see the Mina documentation:
#
#  - https://github.com/mina-deploy/mina/tree/master/docs
