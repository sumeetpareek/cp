#!/usr/bin/perl

use YAML;
use warnings;
use YAML::Dumper;
use YAML::Loader;
use Data::Dumper;

my $match = $ARGV[0];
my $team_one = $ARGV[1];
my $team_two = $ARGV[2];
my $yaml_file_path = $ARGV[3];

open my $yaml_file, '<', $yaml_file_path or die "can't open config file: $!";
my $yaml = YAML::LoadFile($yaml_file);



# Create the player stat file
open (PF, '>'.$match.'_player_stats.csv');
print PF "match_keyname,player_keyname,player_name,runs,sixes,wickets,team_one_or_two\n";
foreach $key (sort keys %{$yaml}) {
  if ($yaml->{$key}->{'team'} eq $team_one) {
    print PF "$match,$key,$yaml->{$key}->{'name'},0,0,0,team-one\n";
  }
  if ($yaml->{$key}->{'team'} eq $team_two) {
    print PF "$match,$key,$yaml->{$key}->{'name'},0,0,0,team-two\n";
  }
}

#Create the team stat file
open (TF, '>'.$match.'_team_stats.csv');
print TF "match_keyname,team_keyname,runs,sixes\n";
print TF "$match,$team_one,0,0\n";
print TF "$match,$team_two,0,0\n";


close TF;
close PF;

exit();
