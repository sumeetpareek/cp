#!/usr/bin/perl -w

# open supplied dir
$files_dir = $ARGV[0];
opendir DIR, $files_dir or die "cannot open dir $files_dir: $!";
my @files= readdir DIR;
closedir DIR;

# read files one by one
foreach my $file (@files) {
  next if ($file eq '.' || $file eq '..');
  open FILE, "<${files_dir}${file}" or die "fail open ${files_dir}${file}";
  $file_contents = do { local $/; <FILE> };
  close FILE;
  
  # remove all newlines
  $file_contents =~ s/\n//g;
  
  # extract timeslot
  while($file_contents =~ m/FooterpanelHead">(.+?)<.+?Playing role<\/b>: (.+?)</g) {
    print "\"$1\";\"$2\";\"$file\"\n"  ;
  }  
}


